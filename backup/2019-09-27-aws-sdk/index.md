---
title: AWS SDK
description: Introduce it to JavaScript developer
date: 2019-09-27T02:32:53.402Z
---

AWS SDK for JavaScript 为开发者提供了基于 JavaScript 的 AWS API，适用于 Node.js 和浏览器环境。

## 配置

AWS SDK 支持两种级别的配置：全局配置和服务级别配置。全局配置会影响 AWS SDK 调用的每一个服务，服务级别配置可以对 AWS SDK 的每一个服务设置单独的配置信息。下面是一个全局配置的示例：

```js
var myCredentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:'IDENTITY_POOL_ID'});
var myConfig = new AWS.Config({
  credentials: myCredentials,
  region: 'us-west-2'
});
```

在上面的代码中，通过全局配置方式设置了 AWS SDK 的访问凭证（credentials）和区域（region）信息。可以继续通过 `update` 更新全局配置信息：

```js
myConfig = new AWS.Config();
myConfig.update({region: 'us-east-1'});
```

服务级别配置的示例如下：

```js
var ec2_regionA = new AWS.EC2({
    region: 'ap-southeast-2',
    maxRetries: 15,
    apiVersion: '2014-10-01'
});
var ec2_regionB = new AWS.EC2({
    region: 'us-east-1',
    maxRetries: 15,
    apiVersion: '2014-10-01'
});
```

## 凭证

每一个 AWS 账户都有一个 Root 凭证，凭证包含 Access Key ID 和 Secret Access Key 两个信息，通过 Root 凭证可以访问 AWS 上的任一服务，应谨慎使用 Root 凭证，合理的方式是为不同的产品创建独立的凭证。建议按照以下顺序加载凭证：

- 从 Amazon EC2 的 IAM 角色加载
- 从共享凭证（`~/.aws/credentials`）加载
- 从环境变量加载
- 从存储的 JSON 文件加载

#### 共享凭证

Linux / Unix 上的共享凭证位于 `~/.aws/credentials` 目录，内容类似如下所示：

```toml
[default] ; default profile
aws_access_key_id = <DEFAULT_ACCESS_KEY_ID>
aws_secret_access_key = <DEFAULT_SECRET_ACCESS_KEY>

[personal-account] ; personal account profile
aws_access_key_id = <PERSONAL_ACCESS_KEY_ID>
aws_secret_access_key = <PERSONAL_SECRET_ACCESS_KEY>

[work-account] ; work account profile
aws_access_key_id = <WORK_ACCESS_KEY_ID>
aws_secret_access_key = <WORK_SECRET_ACCESS_KEY>
```

默认使用 `default` 凭证，可以通过如何方式使用指定的凭证：

```js
var credentials = new AWS.SharedIniFileCredentials({
    profile: 'work-account'
});
AWS.config.credentials = credentials;
```

#### 环境变量

AWS SDK 会自动检测环境变量中的 AWS 凭证：

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_SESSION_TOKEN（可选）

## References

- [AWS SDK for JavaScript Developer](https://docs.aws.amazon.com/zh_cn/sdk-for-javascript/v2/developer-guide/welcome.html)
