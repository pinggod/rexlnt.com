---
title: Faster Web App
description: 单页应用性能优化的十二个方向
date: "2016-03-04T12:37:34.000Z"
---

> 翻译自 [https://auth0.com/blog/2016/02/22/12-steps-to-a-faster-web-app/](https://auth0.com/blog/2016/02/22/12-steps-to-a-faster-web-app/)

现在，web app 日益重视用户的交互体验，了解性能优化的方式则可以有效提高用户体验。阅读和实践下面的性能优化技巧，可以帮你改善应用的流畅度、渲染时间和其他方面的性能表现。

## 概述

对 web app 进行性能优化是一份冗杂沉重的工作，这不仅是因为构建一个 web app 需要前后端协作，而且需要多方面的技术栈：数据库、后端、前端，需要运行在多种平台：iOS，安卓，Chrome，Firefox，Edge。这太复杂了！不过，还是有一些历经实践的通用方式可以用来优化 web app 的性能。在接下来的小节中，我们将逐步介绍相关的细节。

性能优化的难点在于找出开发中值得优化的地方。Donald Knuth 说过一句经典的话：“过早的优化是一切罪恶的根源”。这句话背后的意思是说：花费大量时间改善 1% 的性能毫无意义。同时，某些优化方案反倒影响了可读性或可维护性，甚至引入了新的问题。换言之，性能优化不应该被视为“榨干应用程序性能的方法”，而应该视为“对性能和收益的平衡性所进行的探索”。在践行以下优化技巧时要牢记，盲目优化会影响生产效率，甚至得不偿失。最好的方式是使用分析工具来查找性能瓶颈，并在性能优化和开发效率、可维护性等方面保持平衡。

> 开发者浪费了大量的时间去思考或者担心程序的执行速度，但实际上从调试和后期维护的角度看，这些优化措施往往会带来严重的负面影响。我们应该着重 97% 的运行表现：过早的性能优化是一切罪恶的根源。当然，我们也不应该放弃 3% 的痛点。

## 压缩和打包

JavaScript 通常是直接使用源码的方式分发的，而源码解析起来往往要慢于字节码。对于小脚本来说，两者解析的速度并不大，但对于大的应用程序来说，则会明显影响应用程序的启动速度。解决这一痛点，正是 [WebAssembly](https://auth0.com/blog/2015/10/14/7-things-you-should-know-about-web-assembly/) 的出发点之一，它将大幅改善程序的启动速度。文件压缩是剔除文件中无用字符的流程，虽然处理后的代码丧失了可读性，但提高了浏览器的解析速度。

另一方面，模块打包可以将不同的脚本合并为一个脚本，从而降低 HTTP 请求，减少资源加载时间。通常来说，这种工作都会交给相应的工具来处理，比如 [Webpack](https://webpack.github.io/)。

```js
function insert(i) {
    document.write("Sample " + i);
}

for(var i = 0; i < 30; ++i) {
    insert(i);
}
```

压缩之后：

```js
!function(r){function t(o){if(e[o])return e[o].exports;var n=e[o]={exports:{},id:o,loaded:!1};return r[o].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var e={};return t.m=r,t.c=e,t.p="",t(0)}([function(r,t){function e(r){document.write("Sample "+r)}for(var o=0;30>o;++o)e(o)}]);
//# sourceMappingURL=bundle.min.js.map
```

使用 Webpack，我们也可以压缩 CSS 和合并图片，进一步改善程序的启动速度。更多有关 Webpack 的信息请参考[官方文档](http://webpack.github.io/docs/)。

## 按需加载

按需加载资源或者说惰性加载资源（特别是图片）对优化 web app 的性能有很大帮助。对于图片较多的页面，使用惰性加载通常有以下三点好处：

- 减少并发请求，缓解服务器压力，提高加载速度
- 减少浏览器的内存占用率
- 降低服务器的负载

图片或其他资源惰性加载的方案一般是，在程序启动时加载首屏资源，在页面滚动时持续加载即将进入视口的资源。由于这种方法往往需要与页面结构和开发方式相协调，所以常常使用现有的插件和扩展来实现惰性加载。举例来说，[react-lazy-load](https://github.com/loktar00/react-lazy-load) 是一个基于 React 的图片惰性加载插件：

```js
const MyComponent = () => (
  <div>
    Scroll to load images.
    <div className="filler" />
    <LazyLoad height={762} offsetVertical={300}>
      <img src='http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg' />
    </LazyLoad>
    (...)
```

一个典型的按需加载实例就是谷歌的[图片搜索工具](https://www.google.com/search?site=&tbm=isch&source=hp&biw=1366&bih=707&q=parrots&oq=parrots&gs_l=img.12...0.0.0.4086.0.0.0.0.0.0.0.0..0.0....0...1ac..64.img..0.0.0.UJrFBFKkWMA)，点击这一链接并滚动页面，打开开发者工具注意资源的加载时间。

## array-ids

如果你正在使用 React / Ember / Angular 或者其他操作 DOM 的第三方库，那么使用 array-ids（或者是 Angular 1.x 中的 `track-by` 特性）可以有效提高页面性能，对动态网站的性能优化尤为突出。从最新的基准测试中我们也可以看出其中的优势：[More Benchmarks: Virtual DOM vs Angular 1 & 2 vs Mithril.js vs cito.js vs The Rest (Updated and Improved!)](https://auth0.com/blog/2016/01/11/updated-and-improved-more-benchmarks-virtual-dom-vs-angular-12-vs-mithril-js-vs-the-rest/)。

![https://cdn.auth0.com/blog/newdombenchs2/usedheap.svg](https://cdn.auth0.com/blog/newdombenchs2/usedheap.svg)

其背后的核心概念就是尽可能多地重复利用现有节点。Array-ids 便于 DOM 操作引擎根据获取到的 DOM 节点与真实的节点相匹配。如果没有 array-id 或者 track-by，大多数第三方库都会简单粗暴的删除节点然后再创建节点，这会严重影响程序的执行速度。

## 缓存

缓存常用来存储频繁调用的数据，当缓存后的数据再次被调用时，就可以由缓存直接提供数据，提高数据的响应速度。通常来说，一个 web app 都是由多个组件构成的，在这些组件中都能发现缓存的影子。比如动态内容服务器和客户端之间使用的缓存，通过减少通用请求降低服务器负载，可以改善页面的响应时间；比如代码中的缓存处理，可以优化某些通用的脚本访问模式。此外，还有数据库缓存和长进程缓存等。

简而言之，缓存是改善应用程序响应速度和降低 CPU 负载的有效方式。在一个开发体系中，最难的不是如何使用缓存，而是找出哪里适合使用缓存。对于这一问题，我还是建议使用事件分析工具（profiler）：找出性能瓶颈，检测缓存是否成功，测试缓存是否容易失效……这些问题都需要历经实践才能得出有效的结论。

使用缓存可以优化资源加载，比如，使用 [basket.js](https://addyosmani.com/basket.js/) 利用本地存储缓存应用的脚本，在第二次调用资源时可以迅速从本地存储中获得相应的资源。

Amazon CloudFront 是现在比较流行的一项缓存服务。CloudFront 的工作机制类似内容分发网络（CDN），可以为动态内容设置缓存。

## HTTP/2

目前，已经有越来越多的浏览器支持 HTTP/2。HTTP/2 的优势在于它与服务器的并发连接，比如，如果需要加载的小型资源（前提是你不对资源进行打包）比较多，HTTP/2 在响应时间和性能上都要远远优胜于 HTTP/1。你可以点击 [Akamai 的 HTTP/2 示例](https://http2.akamai.com/demo) 查看两者的区别。

![https://cdn.auth0.com/blog/fasterweb/http2demo.png](https://cdn.auth0.com/blog/fasterweb/http2demo.png)

## 性能剖析

性能剖析是应用程序进行性能优化的重要步骤。如上文所说，盲目地优化应用程序往往会降低生产力、产生新的痛点且难以维护。性能剖析的作用就是要找出应用程序中潜在的风险区域。

对 web 应用程序来说，响应速度是一个非常重要的衡量指标，所以开发者都会尽可能地去提高资源的加载速度和页面的渲染速度。Chrome 浏览器提供了一系列优秀的性能剖析工具，其中最常用的就是开发者工具中的 timeline 和 network，善用它们可以准确定位有关响应速度的风险区域。

![https://cdn.auth0.com/blog/fasterweb/timeline.png](https://cdn.auth0.com/blog/fasterweb/timeline.png)

timeline 面板便于快速查找耗时操作。

![https://cdn.auth0.com/blog/fasterweb/network.png](https://cdn.auth0.com/blog/fasterweb/network.png)

network 面板便于定位由请求时间和串行加载引起的响应速度问题。

此外，如果合理分析内存的使用率，也将有效提高应用程序的性能。如果你的页面中有大量的视觉元素（比如动态的表格）或者大量的交互元素（比如游戏），那么对内存使用的剖析就可以有效减少卡顿，提高帧速。如果你想了解如何在 Chrome 开发者工具中进行内存剖析，请参考这篇文章：[《4 Types of Memory Leaks in JavaScript and How to Get Rid Of Them 》](https://auth0.com/blog/2016/01/26/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/)。

Chrome 开发者工具也可以对 CPU 的使用进行剖析，更多详细信息请参考来自谷歌文档的这篇文章：[《 Profiling JavaScript Performance》](https://developer.chrome.com/devtools/docs/cpu-profiling)。

![https://cdn.auth0.com/blog/fasterweb/cpu.png](https://cdn.auth0.com/blog/fasterweb/cpu.png)

找出性能的核心痛点，才能让你更加高效地进行性能优化。

相对而言，对后端进行性能剖析稍显困难。一般而言，从最耗时的请求入手查找相应的服务器是个不错的方法。这里并没有推荐任何有关后端的性能剖析工具，这是因为具体的剖析工具要视具体的后端技术栈而定。

#### 算法

在大多数情况下，选择更高效的算法可以比局部优化获得更佳的收益。从某种意义上说，对 CPU 和内存进行性能剖析有助于帮助开发者找出应用程序中较大的性能瓶颈。如果这些瓶颈并不是由代码的错误引起的，那很有可能就是算法的问题。

## 负载均衡

在上文的缓存一节中，简单提到了内容分发网络（CDN）的概念。根据服务器或者地理区域分发负载可以有效提高资源的响应速度，这一优势在处理并发链接时尤为明显。

简而言之，负载均衡类似于一种轮询方案，基于反向代理服务器 [nginx](http://nginx.org/en/docs/http/load_balancing.html) 或者成熟的分发网络（比如 [Cloudflare](https://www.cloudflare.com/) 和 [Amazon CloudFront](https://aws.amazon.com/cloudfront/) 构建。

![https://cdn.auth0.com/blog/fasterweb/diagram.png](https://cdn.auth0.com/blog/fasterweb/diagram.png)

为了实现负载均衡，需要将动态内容和静态内容进行分离，便于执行并行连接。换言之，串行访问削弱了负载均衡检索最佳路径并进行分发的能力。此外，并行加载资源还可以加快应用程序的启动速度。

负载均衡也可以构建的很精细。如果数据模型不能够很好地与最终的一致性算法或缓存保持良好的匹配关系，那么必将导致诸多问题。幸运的是，大多数的应用程序所请求的数据都是一个缩减集，该缩减集本身具有较高级别的一致性。如果你的应用程序还没有具备这样的能力，那么你需要考虑重构它了。

## 同构 JavaScript

对于 web 应用程序来说，一个增强用户体验的法门就是减少启动时间或者减少首屏渲染时间，这一点对于需要在客户端执行大量逻辑操作的单页应用尤为重要。在客户端执行的逻辑操作越多，通常意味着需要在首屏渲染前加载更多的资源。同构 JavaScript 就是用来解决这一问题的：JavaScript 可以同时在客户端和服务端执行，所以可以在服务端渲染出来首屏，然后将其发送给客户端，再由客户端的 JavaScript 接手剩下的逻辑处理。这一方案限制了服务端只能基于 JavaScript 框架，但可以提高用户体验。目前，在 [Meteor.js](https://www.meteor.com/) 中已经可以直接使用这一方式了。此外，在 [React](https://github.com/DavidWells/isomorphic-react-example) 框架中也可以采用这种方式，代码如下所示：

```js
var React = require('react/addons');
var ReactApp = React.createFactory(require('../components/ReactApp').ReactApp);

module.exports = function(app) {

    app.get('/', function(req, res){
        // React.renderToString takes your component
        // and generates the markup
        var reactHtml = React.renderToString(ReactApp({}));
        // Output html rendered by react
        // console.log(myAppHtml);
        res.render('index.ejs', {reactOutput: reactHtml});
    });

};
```

下面是 Meteor.js 的简单示例：

```js
if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to myapp.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
```

如果你开发的是大中型复杂应用且支持同构发布，那么可以尝试一下这种方式，效果很可能令人震撼。

## 索引

如果数据库查询占据了太多的执行时间，那么你应该考虑优化数据库的执行速度了。每种数据库和数据模型都各有特色。数据库优化有多种方向：数据模型、数据库类型以及其他配置，所以优化起来并不简单。不过，我们还是有一些通用的优化技巧，比如说：索引。索引根据数据库的数据创建快速访问的数据结构，改善对特定数据的检索速度。现在大多数的数据库都支持索引功能，

在使用索引优化数据库之前，你应该研究当前应用程序的访问模式，分析最常用到的查询是什么，哪一个键或者字段会被频繁查询等等。

## 编译工具

JavaScript 技术栈日益复杂，这也推动了语言本身的进步。不幸的是，JavaScript 的发展目前还要受限于用户的访问环境。虽然 ECMAScript 2015 已经对 JavaScript 做出了诸多改进，但是开发者尚不能直接遵循这一规范的代码。针对这一问题，也就衍生出了诸多编译工具，这些工具常用于将 ECMAScript 2015 的代码转换为 ECMAScript 5 的代码。此外，模块打包和文件压缩也加入到了编译过程，最终用于生成线上版本的代码。这些工具将代码转换为了一个受限的版本，间接影响到了最终代码的执行效率。谷歌开发者 Paul Irish 测试了代码转换对性能和文件大小的影响，详情请[点击链接](https://github.com/paulirish/The-cost-of-transpiling-es2015-in-2016)。虽然大多数情况下影响甚微，但这些差异仍然值得引起注意，因为随着应用程序的复杂大增高，这些差异也将日益增大。

## 阻塞渲染

JavaScript 和 CSS 资源的加载都会阻塞页面的渲染过程。通过某些技巧，开发者可以尽快加载 JavaScript 和 CSS 资源，从而让浏览器尽快显示网站的内容。

对 CSS 来说，本质上符合当前页面媒体属性的 CSS 规则会具有较高的处理优先级。页面的媒体属性由 CSS 的媒体查询进行匹配。媒体查询通知浏览器哪一个 CSS 脚本针对哪一种媒体属性。举例来说，相对于当前屏幕显示的 CSS，用于打印的 CSS 的优先级较低。

可以为 `<link>` 标签设置与媒体查询有关的属性：

```html
<link rel="stylesheet" type="text/css" media="only screen and (max-device-width: 480px)" href="mobile-device.css" />
```

对 JavaScript 来说，关键是恰当地使用内嵌 JavaScript（即在 HTML 中的 JavaScript）。内嵌 JavaScript 应该尽可能简短，且不能阻塞对页面其他部分的阻塞。换言之，位于 HTML 文档树之中的内嵌 JavaScript 会阻塞 HTML 脚本的解析，强制解析引擎直到脚本执行完成才能继续解析。如果 HTML 树中有大量这种阻塞脚本或者阻塞时间过长，势必严重破坏应用程序的用户体验。内嵌 JavaScript 有助于防止网络获取过多的脚本。对于反复用到的脚本，或者体积较大的脚本，不建议使用内联形式。

一种有效防止 JavaScript 阻塞 HTML 解析的方法是以异步的方式加载 `<script>` 标签。这种方式限制了我们队 DOM 的访问（无法使用 `document.write`)，但可以让浏览器在解析和渲染页面的时候无需考虑 JavaScript 的执行状态。换言之，为了获取最佳的启动速度，应该确保所有非必需的脚本都要以异步的形式加载：

```js
<script src="async.js" async></script>
```

## service workers / stream

Jake Archibald 的[最新文章](https://jakearchibald.com/2016/streams-ftw/#streaming-results) 对提高渲染速度提出了一个很有意思的方案：结合 service workers 和 stream 进行页面渲染。结果相当令人信服：

<iframe width="560" height="315" src="https://www.youtube.com/embed/Cjo9iq8k-bc" frameborder="0" allowfullscreen></iframe>

不幸的是，这一技巧所用到的 API 尚在变化之中，所以还不能应用于实际开发中。这一技巧的核心是在网站和客户端之间存放一个 service worker。service worker 可以用于缓存数据（比如网站的头部等不常变动的部分），避免网络查找失败。如果缓存数据丢失，可以通过 stream 快速获取。

## 扩展阅读

更多有关性能优化的信息和工具请参考以下链接：

- [Best Practices for Speeding up Your Website - Yahoo Developer Network](https://github.com/paulirish/The-cost-of-transpiling-es2015-in-2016)
- [YSlow - a tool that checks for Yahoo's recommended optimizations](http://yslow.org/)
- [PageSpeed Insights - Google Developers](https://developers.google.com/speed/docs/insights/rules)
- [PageSpeed Tools - Google Developers](https://developers.google.com/speed/pagespeed/)
- [HTTP/2: The Long-Awaited Sequel](http://blogs.msdn.com/b/ie/archive/2014/10/08/http-2-the-long-awaited-sequel.aspx)

## 结论

随着应用程序变得越来越庞大和复杂，性能优化在 web 开发中的地位也越来越重要。针对性的性能优化至关重要，有助于降低时间成本和维护成本。web 应用程序历经发展，其作用已经不再是单一的内容展现，学习通用的性能优化模式，可以将一个难以使用的应用程序转为一个易于上手的工具。没有任何规则是绝对的，只有不断研究和剖析技术栈的深层次逻辑，才能合理进行性能优化。

