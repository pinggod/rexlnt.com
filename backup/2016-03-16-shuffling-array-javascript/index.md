---
title: Shuffling Array
description: JavaScript 实现洗牌算法和解析原理?
date: '2016-03-16T05:45:02.000Z'
---

洗牌算法是一个比较形象的术语，本质上是让一个数组内的元素随机排列。举例来说，我们有一个如下图所示的数组，数组长度为 9，数组内元素的值顺次分别是 1~9：

![shffle-array-1](./shuffle-array-1.png)

从上面这个数组入手，我们要做的就是打乱数组内元素的顺序：

![shffle-array-2](./shuffle-array-2.png)

---

## 代码实现

维基百科上的 [Fisher–Yates shuffle](http://en.wikipedia.org/wiki/Knuth_shuffle) 词条对洗牌算法做了详细介绍，下面演示的算法也是基于其中的理论编写的：

```js
Array.prototype.shuffle = function() {
    var input = this;
    for (var i = input.length-1; i >=0; i--) {
        for (var i = input.length-1; i >=0; i--) {
            var randomIndex = Math.floor(Math.random()*(i+1));
            var itemAtIndex = input[randomIndex];

            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
    }
    return input;
}

var tempArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
tempArray.shuffle();

// and the result is...
alert(tempArray);
```

在上面的代码中，我们创建了一个 `shffle()` 方法，该方法用于随机排列数组内的元素。此外，我们将该方法挂载在了 `Array` 对象的原型下面，所以任何数组都可以直接调用该方法：

```js
var tempArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
tempArray.shuffle();
```

---

## 工作原理

看完代码之后，让我们看看它对数组都做了写什么。首先，该方法选中数组的最后一个元素：

![shffule-array-3](./shuffle-array-3.png)

接下来确定挑选随机元素的范围，从数组的第一个元素到上一步选中的元素都属于这一范围：

![shffule-array-4](./shuffle-array-4.png)

确定范围后，从中随机挑选一个数，这里假设随机选中的元素为 4：

![shffule-array-5](./shuffle-array-5.png)

然后交换最后一个元素和随机选中的元素的值：

![shffule-array-6](./shuffle-array-6.png)

上面的交换完成后，相当于我们完成了对数组最后一个元素的随机处理。接下来选中数组内倒数第二的元素：

![shffule-array-7](./shuffle-array-7.png)

之所以从后往前处理，是因为这样便于确定随机选择的范围。这次我们假定随机到的元素为 2:

![shffule-array-8](./shuffle-array-8.png)

接着交换倒数第一个元素和 2 号元素的值，完成对倒数第二个元素随机排列的处理。然后是选中倒数第三个元素，重复之前的操作：

![shffule-array-9](./shuffle-array-9.png)

剩下的就是一些重复性的工作，不多做介绍了。

---

## 分析代码

在上一节给各位用图例演示了洗牌流程，下面我们从代码本身看看洗牌流程。先从 `shuffle` 函数说起吧：

```js
Array.prototype.shuffle = function() {
    var input = this;

    for (var i = input.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}
```

`shuffle` 函数挂载在 `Array` 对象的原型之下，便于数组直接调用该函数。在 `shuffle` 函数内部，`this` 引用的就是调用该 `shuffle` 的数组：

```js
var input = this;
```

在上面的代码中，我用一个新的变量引用 `this`，也就是调用 `shuffle` 函数的数组。下一步，看一下 `for` 循环内都干了什么：

```js
for (var i = input.length-1; i >=0; i--) {

    var randomIndex = Math.floor(Math.random()*(i+1));
    var itemAtIndex = input[randomIndex];

    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
}
```

该循环用于遍历所有数组内的所有元素，并进行随机交换。注意，遍历顺序是从后往前进行的，也就是说从 `input.length-1` 位置的元素开始，知道遍历到数组中的第一个元素。遍历过程中的位置由变量 `i` 指定。

这里的变量 `i` 就是上面图例中被选中的元素：

![shffule-array-3](./shuffle-array-3.png)

接下来，使用了两行代码在指定范围内挑选一个随机元素：

```js
var randomIndex = Math.floor(Math.random()*(i+1));
var itemAtIndex = input[randomIndex];
```

变量 `randomIndex` 存储了一个随机数，该随机数可以用作数组的索引，进而提取一个随机元素。注意，该随机数的最大值并不是数组的长度，而是变量 `i` 的值。

确定了随机元素的索引之后，用新的变量保存该元素的值，然后交换选中元素和随机元素的值：

```js
var itemAtIndex = input[randomIndex];
input[randomIndex] = input[i];
input[i] = itemAtIndex;
```

在这三行代码中，第一行使用新的变量保存了随机元素的值；第二行将选中元素 `input[i]` 的值赋给随机元素 `input[randomIndex]`；第三行就随机元素的值 `itemAtIndex` 赋给选中元素 `input[i]`。本质上是一个互换两个元素的值的过程，并不难理解。

至此，循环内的逻辑就介绍完了，剩下的都是重复操作。

---

## 参考资料

- [Shuffling an Array in JavaScript](https://www.kirupa.com/html5/shuffling_array_js.htm)
- [Fisher–Yates Shuffle](https://bost.ocks.org/mike/shuffle/)
- [Hacker News: A visual explanation of Fisher–Yates shuffle](https://news.ycombinator.com/item?id=3464607)
- [Stack Overflow: Is it correct to use JavaScript Array.sort() method for shuffling?](http://stackoverflow.com/questions/962802/is-it-correct-to-use-javascript-array-sort-method-for-shuffling/962890#962890)
