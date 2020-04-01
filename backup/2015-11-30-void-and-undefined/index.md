---
title: Void And Undefined
description: 如何区分「空」和「未定义」?
date: '2015-11-30T12:18:37.000Z'
---

一直以来，`undefined` 都不是 JavaScript 的关键字或保留字，这意味着开发者可以修改 window.undefined 的值。由于 undefined 会被频繁调用作为比较运算的操作数，所以在 ES5 规范之后，window.undefined 被定义为不可写、不可配置的属性。常见的 undefined 情况如下:

- 变量声明后未赋值，则变量会被自动赋值为 undefined
- 函数中定义了一些形参，如果传入的实参少于预定义的形参，那么有一些形参就会匹配不到实参，继而会被自动赋值为 undefined
- 没有返回值的函数，默认返回 undefined

`void (expression)`，void 作为一个运算符，无论表达式的内容是什么，只要跟在 void 之后都会被调用执行，执行完毕后 void 操作符返回 undefined。简而言之，使用 void 运算符有三种用处：生成 undefined；让函数立即执行；充当 `javascript:` 协议的 URI。

## 生成 undefined

使用 `void 0` 生成 undefined 的做法由来已久，既减少了在原形链上查找 window.undefined 的时间，也避免了误用被修改过的 undefined。

```js
function checkLogin (loginName) {
    if (loginName === void 0) {
        console.log('Wrong!');
    }
}

checkLogin();
// => 'Wrong!'
```

## 立即执行函数

**运算符和函数组合使用，可以让函数立即执行。**实际上，有许多运算符可以让函数立即执行，比如 `+、-、!、~` 以及本文提到的 void 运算符。此外，还有最常见的小括号（分组运算符）：

```js
(function(){
    console.log('立即执行');
})();
// => '立即执行'
```

## 充当协议的 URI

对于网页中的点赞、收藏等按钮，如果使用 a 标签来实现的话，往往会用到类似 `href="javascript:void(0)"` 的代码，这段代码的作用是点击链接时让页面不跳转。

在 `href="javascript:void(0)"` 中，使用了一个以 `javascript:` 协议开头的 URI，浏览器默认会对冒号后面的代码求值，然后将结果显示在新的页面，但有一种情况例外，如果结果是 undefined，浏览器就不会刷新页面渲染新值。

实际上，我们有很多方式实现点赞、收藏的效果，无需使用这么 Hack 的方式——虽然这确实很方便。

`javascript:` 协议声明了 URL 的主体是任意的 javascript 代码，由 javascript 解释器编译执行，通常使用 `javascript:URL` 执行某些不改变当前页面文档的代码，要做到这一点，必须确保 URL 的最后一条语句没有返回值，比如使用 `void 0`。

## 参考资料

- [undefined](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)
- [void 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void)
- [谈谈 Javascript 中的 void 操作符](http://segmentfault.com/a/1190000000474941)
- [JavaScript 中伪协议 javascript: 使用探讨](http://www.jb51.net/article/52358.htm)
