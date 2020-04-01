---
title: AWS CloudFormation
description: How to organize infrastructure on AWS
date: 2019-09-22T09:48:53.402Z
---

AWS CloudFormation 基于配置模版创建基础架构，模版使用 JSON/YAML 描述架构模型和组件之间的连接关系。CloudFormation 具有以下有点：

- 在 aws 平台上以统一的方式描述基础架构
- 能够处理组件之间的连接关系、依赖关系
- 可复制，便于创建多套环境
- 可自定义，支持配置自定义参数
- 可更新，CloudFormation 自动查找模版更新的部分，尽可能平滑地应用到现有的基础架构
- 避免人为失误
- 基础架构文档，基础设施即代码，支持使用版本控制系统跟踪历史变更
- 可测试

## 模版解析

CloudFormation 模版由五部分组成：

```json
{
    // CloudFormation 版本
    // 2010-09-09 是目前唯一合法的值
    AWSTemplateFormatVersion: "2010-09-09",
    // 模版描述信息
    Description: "CloudFormation template structure",
    // 参数信息
    // 开发者通过配置自定义参数进而自定义模版在不同环境、不同阶段的功能
    Parameters: {},
    // 资源信息
    // 资源是开发者描述组件的最小单位
    Resources: {},
    // 输出信息
    Outputs: {}
}
```

### Metadata

### 参数
参数包括至少一个名称和类型，建议开发者同时增加一个描述信息：

```json
{
  Parameters: {
    // 参数名称
    NameOfParameter: {
      // 参数类型
      Type: 'Number',
      // 参数描述信息
      Description: '',
      // 更多参数属性
    }
  }
}
```

### 资源

一个资源（Resource）至少有一个名字、一个类型和一些属性：

```json
{
	Resources: {
    // 资源名称
    NameOfResource: {
      // 资源类型
    	Type: 'AWS::EC2::Instance',
      // 资源属性
      Properties: {},
    }
  }
}
```

#### CloudFormation 参数类型

[https://docs.aws.amazon.com/zh_cn/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html#aws-specific-parameter-types](https://docs.aws.amazon.com/zh_cn/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html#aws-specific-parameter-types)

#### CloudFormation 参数属性

[https://docs.aws.amazon.com/zh_cn/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html#parameters-section-structure-properties](https://docs.aws.amazon.com/zh_cn/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html#parameters-section-structure-properties)

### Mappings

### Conditions

### 输出
输出包括至少一个名称（如参数和资源）和一个值，建议开发者同时增加一个描述信息：

```json
{
  Outputs: {
    // 输出名称
    NameOfOutput: {
      // 输出值
      Value: '',
      // 描述信息
      Description: '',
    }
  }
}
```

### 辅助函数

[https://docs.aws.amazon.com/zh_cn/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html](https://docs.aws.amazon.com/zh_cn/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html)


## 最佳实践

[https://docs.aws.amazon.com/zh_cn/AWSCloudFormation/latest/UserGuide/best-practices.html](https://docs.aws.amazon.com/zh_cn/AWSCloudFormation/latest/UserGuide/best-practices.html)

