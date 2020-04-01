---
title: HTML5 Canvas
description: Canvas 画布基础知识笔记
date: '2016-02-16T05:17:10.000Z'
---

Canvas 是 HTML5 新引进的特性，通过 Canvas 技术可以使用 JavaScript 在浏览器中绘制图形。目前主流浏览器（IE9+）都支持该特性。创建一个最简单的 canvas 只需要两步，第一步是创建一个 canvas 标签：

```html
<canvas id="canvas"></canvas>
```

接下来使用 JavaScript 获取 canvas 的上下文：

```js
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
```



大功告成！

## 修改大小

canvas 画布的默认尺寸为 300px * 150px，如果想要修改该尺寸，可以在 canvas 标签上添加 width 和 height 属性：

```html
<canvas id="canvas" width="500" height="500"></canvas>
```

width 和 height 属性不仅仅指定了画布的大小，而且同时制定了画布的分辨率。另一个值得注意的是，不用给这两个属性值添加单位。如果画布的尺寸不确定，还可以使用 JavaScript 进行控制：

```js
canvas.width = 500;
canvas.height = 500;
```

## 画线

在 canvas 中画线只需要三行代码：

```js
// move context to position (100, 100)
ctx.moveTo(100, 100);

// draw a line from current position of context to (500, 500)
ctx.lineTo(500, 500)

// all above was not executed util calling stroke or fill method
ctx.stroke()
```

下面是常用的 context 方法：

- `lienWidth`, 设置线段的粗细
- `lineCap`, 设置线段两端的样式： `butt(default)` / `round` / `square`
- `lineJoin`, 设置两条线段连接处的样式：`miter(default)` / `bevel` / `round`
- `strokeStyle`, 设置线段的颜色
- `stroke`，绘制线段
- `fillStyle`, 设置填充区域的颜色
- `fill`, 填充一段区域

> 使用 `beginPath()` 和 `closePath()` 可以绘制多条独立的线段：

```js
ctx.beginPath()
ctx.moveTo(100, 100);
ctx.lineTo(500, 500);
ctx.lineTo(100, 500);
ctx.closePath();
ctx.fillStyle = "green";
ctx.fill();

ctx.beginPath();
ctx.moveTo(200, 100);
ctx.lineTo(300, 200);
ctx.closePath();
ctx.lineWidth = 20;
ctx.strokeStyle = "yellow";
```

## 绘制矩形

`ctx.rect(x, y, width, height)` 方法可以用来绘制一个矩形:

```js
cxt.beginPath();
cxt.rect(0, 0, 100, 100);
cxt.closePath();

cxt.lineWidth = 10;
cxt.fillStyle = 'red';
cxt.strokeStyle = 'blue';

cxt.fill();
cxt.stroke();
```

下面是两个更简洁的矩形绘制方法：

```js
cxt.lineWidth = 10;
cxt.fillStyle = 'red';
cxt.strokeStyle = 'blue';

cxt.fillRect(0, 0, 100, 100);
cxt.strokeRect(0, 0, 100, 100);
```

## 画圆

`ctx.arc(x, y, r, startAngle, endAngle, anticlockwise)` 方法可以用来绘制一个圆形，圆形位于 (x, y)，半径为 r，起始点为 `startAngle`，终点为 `endAngle`，`anticlockwise` 决定旋转方向，默认值为顺时针方向。

```js
ctx.beginPath();
ctx.arc(50, 50, 50, 0, 1.5 * Math.PI);
ctx.closePath()
ctx.lineWidth = 1;
ctx.fillStyle = "#42b983";
ctx.fill();
```

> `ctx.clearrect(xTopLeft, yTopLeft, xBottomRight, yBottomRight)` 方法可以用来清除特定区域。

## 图形变换

- `rotate(deg)`，旋转
- `scale(sx, sy)`，缩放
- `translate(x, y)`，位移
- `save()`，图形变换前保存当前状态
- `restore()`，图形变换后恢复上一状态

执行图形变换操作时，需要组合使用 `save()/restore()` 函数来保存和恢复上下文执行环境的状态，避免状态叠加，比如下面代码的第二个矩形，将会叠加成 (400, 400) 的偏移量：

```js
// 第一个矩形
ctx.translate(100, 100);
ctx.fillRect(0, 0, 400, 400);

// 第二个矩形
// 这里本意是想将第二个矩形偏移 (300, 300)
// 实际上会由于前面偏移量的影响，实际偏移是叠加之前偏移量的偏移 (100 + 300, 100 + 300)
ctx.translate(300, 300);
ctx.fillRect(0, 0, 400, 400);

// 解决方法是使用 save() 和 restore() 对状态进行保存和恢复

ctx.save();
ctx.translate(100, 100);
ctx.fillRect(0, 0, 400, 400);
ctx.restore();

ctx.save();
ctx.translate(300, 300);
ctx.fillRect(0, 0, 400, 400);
ctx.restore();
```

此外，CANVAS 提供了一个支持变换矩阵的函数 `transform(a, b, c, d, e, f)`:

```bash
--         --
|  a  c  e  |
|  b  d  f  |
|  0  0  1  |
--         --
```

- a 表示水平缩放，默认值为 1
- b 表示水平倾斜，默认值为 0
- c 表示垂直倾斜，默认值为 0
- d 表示垂直缩放，默认值为 1
- e 表示水平位移，默认值为 0
- f 表示垂直位移，默认值为 0

## fillStyle

除了可以赋予具体的颜色，fillStyle 还可以是线性渐变、径向渐变、图片、CANVAS 和视频等：

```js
// 创建线性渐变
var linear = ctx.createLinearGradient(xStart, yStart, xEnd, yEnd);
linear.addColorStop(stop, color);
ctx.fillStyle = linear;

// 创建径向渐变
var radial = ctx.createRadialGradient(x0, y0, z0, x1, y1, z1);
radial.addColorStop(stop, color);
ctx.fillStyle = radial;

// 创建图像填充
var image = ctx.createPattern(new Image('path/to/image'), repeat-style);
ctx.fillStyle = image;

// 创建 CANVAS 填充
var canvas = ctx.createPattern(canvas, repeat-style);
ctx.fillStyle = canvas;

// 创建视频填充
var video = ctx.createPattern(video, repeat-style);
ctx.fillStyle = canvas;
```

- `stop` 的取值范围是 `[0, 1]`
- `repeat-style` 的可选值是 `no-repeat`、`repeat-x`、`repeat-y` 和 `repeat`

## 曲线

在上面我们已经尝试使用 `arc()` 来绘制封闭曲线，实际上，CANVAS 还提供了其他的专用曲线绘制函数：

- `arcTo()`
- `quadraticCurveTo()`，二次贝塞尔曲线
- `bezierCurveTo()`，三次贝塞尔曲线

```js
ctx.moveTo(x0, y0);
ctx.arcTo(x1, y1, x2, y2, radius);

// or
ctx.quadraticCurveTo(x1, y1, x2, y2);

// or
ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
```

## 文字

- `ctx.textAlign`，水平对齐方式
- `ctx.textBaseline`，文字对齐方式
- `ctx.measureText(string).width`，文本的度量

```js
ctx.font = "bold 40px Arial";
ctx.fillText("CANVAS", x, y, [maxlen]);
ctx.strokeText('CANVAS', x, t, [maxlen])
```

## 参考资料

- [Canvas 绘图详解](http://www.imooc.com/video/3492)

