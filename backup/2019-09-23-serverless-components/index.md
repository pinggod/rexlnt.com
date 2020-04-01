---
title: Serverless Components
description: Forget intrastructure
date: 2019-09-23T08:07:30.379Z
---

> 翻译总结自：https://serverless.com/blog/10-tips-creating-robust-serverless-components

Serverless 期望弱化开发者对底层基础设施的感知，基于各类 BaaS 服务高度专注业务开发。在 Serverless Framework 团队提供 Serverless Components 功能之前，开发者使用 Serverles Framework、AWS CloudFormation、AWS SAM 等工具/框架，依然无法摆脱使用 AWS Cloudfroamtion 等资源编排工具的桎梏。Serverless Components 的核心是提供一套资源管理的生命周期函数、基于类似 AWS SDK 的云厂商 SDK、以可编程的方式，实现基础资源编排能力的可复用性。

继续阅读下去，你会理解为什么我们认为 Serverless Framework 是 Serverless 的变局者（game-changer）。

## 特性

#### 易用性

现有工具依然关注于基础设施的编排，且配置文件不经意间变得冗余繁琐，间接增加了心智成本。Serverless Components 覆盖的运维场景和抽象的编排粒度都远超现有工具。下面示例演示了如何使用 Serverless Components 聚合 AWS S3、Cloudfront、ACM 证书和自定义域名等功能：

```yaml
# serverless.yml
name: website

website:
  component: '@serverless/website'
  inputs:
    code:
      src: dist
      root: dashboard
      hook: npm run build
    domain: https://www.serverless-website.com
```

在此基础上更进一步，下面示例演示了如何组合多个 Serverless Components 运维一个完整的应用：

```yaml
# serverless.yml

name: fullstack-application

dashboard:
  component: '@serverless/website'
  inputs:
    code:
      src: dist
      root: dashboard
      hook: npm run build
    env:
      apiUrl: ${api.domain}
    domain: www.serverless-fullstack.com

api:
  component: '@serverless/backend'
  inputs:
    code:
      src: api/src
    env:
      dbName: ${database.name}
      dbRegion: ${database.region}
    domain: api.serverless-fullstack.com

database:
  component: '@serverless/aws-dynamodb'
  inputs:
    region: us-east-1
    attributeDefinitions:
      - AttributeName: 'pk'
        AttributeType: 'S'
    keySchema:
      - AttributeName: 'pk'
        KeyType: 'HASH'
```

#### 复用性

Serverless Components 的核心设计目标就是复用性和组合性。如果你想开发一个具有复用性的 Serverless Component，可以参考：

```js
// serverless.js
const { Component } = require('@serverless/core')

MyBlog extends Component {
  // The default method is the only required class.  It is to Serverless Components what 'render()' is to a React Component.
  async default(inputs) {
    this.context.status('Deploying a serverless blog')
    const website = await this.load('@serverless/website') // Load a component
    const outputs = await website({ code: { src: './blog-code' } }) // Deploy it
    this.state.url = outputs.url // Save state
    await this.save()
    return outputs
  }
}
```

#### 云厂商

Serverless Components 不和任一云厂商强绑定，开发者可以轻松聚合不同云厂商的服务，云厂商既可以是公有云大厂，比如 AWS、Azure、Google、Alibaba，也可以是一些小而美的公司，比如 Stripe、Algolia、Twilio 等。

## 最佳实践

1. Serverless Components 的 Component 各有特色，有些具有底层能力（比如上传 S3），有些具有高阶能力（比如处理图片）。如果你想独立开发 Component，建议开发者优先确立其能力，继而确定传入 Component 的配置参数和最终的响应结果。

2. 虽然 Serverelss Components 的核心简单易懂，但是由于不同云厂商之间的差异性可能带来心智成本，建议开发者参考 [Serverless Components 示例](https://github.com/serverless-components/)开发自己的 Component。


3. Serverless Components 天然为复用性而生，所以在你的 Component 中可以直接使用现有的 Component 进行开发。下面的示例基于 5 个已有的 Component 构建了后端服务：

  ```js
  const bucket = await this.load("@serverless/aws-s3");
  const role = await this.load("@serverless/aws-iam-role");
  const lambda = await this.load("@serverless/aws-lambda");
  const apig = await this.load("@serverless/aws-api-gateway");
  const domain = await this.load("@serverless/domain");

  this.context.status("Deploying AWS S3 Bucket");

  const bucketOutputs = await bucket({
    name: "backend-" + this.context.resourceId(),
    region: inputs.region
  });
  ```

4. 建议在操作资源前从云端检查资源的最新状态。边缘条件下，开发者可能通过 Serverless Component 在本地创建了 Lambda 函数，但是在云端 Console 删除了 Lambda 函数，此时应在本地使用 Lambda 资源前检查状态。下面是一个简化的示例：

  ```js
  const prevLambda = await getLambda({ lambda, ...config });

  if (prevLambda) {
    await updateLambda({ lambda, ...config });
  } else {
    await createLambda({ lambda, ...config });
  }
  ```

5. 正确处理命名冲突和资源变更。如果开发者开发了一个底层 Component，需要注意命名问题，如果名称由用户指定，更应注意名称变动之后，需要删除老的资源并创建新的资源，而不是直接更新老的资源：

  ```js
  // we already created a new lambda with the new name
  // now let's make sure we delete the old one...
  if (this.state.name && this.state.name !== inputs.name) {
    this.context.status(`Replacing Lambda`);
    await deleteLambda({ lambda, name: this.state.name });
  }
  ```

6. 检测用户配置参数中的变更。在部署过程中，某些资源的部署耗时较长，比如 CloudFront 大概需要 20 分钟，建议在 Component 中显式检测云端资源的属性和最新配置的属性是否存在差异，如果没有差异，则可以完全跳过部署。这一处理机制对编码也卓有成效，Lambda 部署就是一个很好的示例。对于每次部署，Serverless 都会将 Lambda 及其依赖打包成一个 Lambda Layer 并在本地记录其 SHA 值，因为在部署前，可以直接比对 SHA 值决定是否相同，如果相同则可以跳过 Lambda 的部署。下面是一个简化的示例：

  ```js
  // the "hash" here represent the SHA string of the lambda
  // for both the new and old code
  const configChanged = (prevLambda, lambda) => {
    const keys = [
      "description",
      "runtime",
      "role",
      "handler",
      "memory",
      "timeout",
      "env",
      "hash"
    ];
    const inputs = pick(keys, lambda);
    const prevInputs = pick(keys, prevLambda);
    return not(equals(inputs, prevInputs));
  };
  ```

7. 妥善处理云厂商抛出的错误信息：

  ```js
  const getLambda = async ({ lambda, name }) => {
    try {
      const res = await lambda
        .getFunctionConfiguration({
          FunctionName: name
        })
        .promise();

      return res;
    } catch (e) {
      if (e.code === "ResourceNotFoundException") {
        // in case of ResourceNotFoundException error, return null,
        // to let the component know that the lambda does not exist
        return null;
      }
      throw e;
    }
  };
  ```

8. 基于本地构建信息删除资源而不是基于用户配置信息，当然使用本地构建信息前可以预检云端信息：

  ```js
  await deleteLambda({ lambda, name: this.state.name });
  ```

9. 使用 Serverless Components Core 自带的 helper 事半功倍：

  ```js
  const { Component, utils } = require("@serverless/core");

  class myComponent extends Component {
    async default(inputs = {}) {
      // your logic here...

      if (!(await utils.fileExists(path))) {
        await utils.writeFile(path, contents);
      }
    }
  }

  module.exports = myComponent;
  ```

10. 发布 Serverless Component 和发布 npm 包的操作是一致的，只需留意将 `package.json` 的 `main` 属性指向 `serverless.js` 即可。如果你希望将 Serverless Component 发布到 Serverless Components 官方仓库，请在 twitter 联系 [@eahefnawy](https://twitter.com/eahefnawy)。

## References

- [Serverless Components Beta](https://serverless.com/blog/serverless-components-beta/)
- [Serverless Components 10 Tips](https://serverless.com/blog/10-tips-creating-robust-serverless-components/)

