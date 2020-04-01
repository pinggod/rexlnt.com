---
title: 文字排版
description: CSS letter-spacing / word-spacing / white-space
date: '2015-12-03T05:24:27.000Z'
---

从某种意义上说，网页是印刷的电子化产品，也离不开排版布局等设计工作，网页中的文字排版问题常见于中英文混排时的对齐问题。

## 间距

使用 CSS 控制文字间距是比较简单的一件事，下面属性可以从微观到宏观的调整文字间距：

- `letter-spacing`，调整字与字之间的间距，对于英文来说就是字母之间的间距，对于中文来说就是每个汉字之间的间距
- `word-spacing`，调整‘单词’与‘单词’之间的间距，无论中英文，这里的单词是指被半角空白符包围的独立字块，比如 `使用 CSS 控制...` 中的 `CSS` 就是一个字块，但是 `使用CSS控制...` 中就没有字块
- `line-height`，调整行与行之间的间距

上面三个属性控制了从字母到行之间的间距，如果要调整更大范围的间距，则可以使用 `margin`、`padding` 属性实现。

## 换行

默认情况下，浏览器有一套自己的算法对长文字进行自动换行，但是对于中英文混排或类似 URL 地址的长文字，自动换行的效果不尽人意。首先，我们从最强势的 `white-space` 讲起。`white-space` 主要有两点功能：决定是否对文本中的空白符进行合并，决定哪种情况下进行换行。其属性值也主要包含两类，一类是合并换行符和空白符的 `normal`、`nowrap`，一类是不合并换行符的 `pre`、`pre-wrap` 和 `pre-line`。

`normal` 和 `nowrap` 的共同点就是会对换行符、制表符、空格等符号毫不留情地合并，最终只保留一个半角空格，其中 `normal` 是浏览器默认使用的处理方式，其与 `nowrap` 的区别在于，`nowrap` 绝不换行，而 `normal` 会在溢出时自动换行，但是换行效果不佳。

`pre`、`pre-wrap` 和 `pre-line` 的共同点是保留换行符，三者之间的差异还是比较大的：

- `pre`，保留空白符但绝不自动换行，只根据换行符进行换行，溢出也不换行
- `pre-wrap`，保留空白符，溢出自动换行
- `pre-line`，合并空白符，移出自动换行

```html
<div>Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Sapiente
    officia facere asperiores voluptatibus         quaerat natus tempora</div>
```

在 `white-space` 之外，还可以使用 `word-wrap` 和 `word-break` 控制换行。`word-wrap` 的默认值是 `normal`，由浏览器控制换行行为，如果遇到长文本溢出，则不做处理，这种效果很难看，使用 `break-word` 可以在溢出时执行掐断和换行：

```html
<div>a aksdfjklajsdfkjaskldfjksaldjflkasjdfklajsdklf b</div>
```

相对于 `word-wrap` 来说，`word-break` 是个激进派，其默认值是 `normal`，由浏览器决定换行行为，如果使用该属性，一般会使用它的另一个属性值 `break-all`，它的中文名叫 “碾碎一切单词让它们换行”：

```html
<div>a aksdfjklajsdfkjaskldfjksaldjflkasjdfklajsdklf b</div>
```
