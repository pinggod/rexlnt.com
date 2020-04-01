---
title: Throttle and Debounce
description: JavaScript 实现以及应用场景
date: '2016-06-28T00:39:04.000Z'
---

Throttle 和 Debounce 函数都可以限定函数的执行时间点，比如在 window#resize 事件中，使用 `throttle(action, time)` 可以让 action 在 time 时间内一定执行且只执行一次，使用 `debounce(action, time)` 函数可以让 action 在 resize 停止 time 时间之后执行。

Throttle 函数设定了函数执行的最大周期，也就是说，在限定时间内一定会执行，且只执行一次；Debounce 则设置了函数执行的最小周期，只有空闲时间大于该周期，才会执行相应的函数。下面是 Debounce 函数的简单实现：


```js
var debounce = function (action, time) {
    var timer;

    return function () {
        var ctx = this;
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(function () {
            action.apply(this);
        }, time);
    };
};

window.addEventListener('resize', debounce(function (){
    console.log('resize');
}, 1000));
```



对于上面的代码，当触发 window#resize 事件时，`debounce(action, time)` 中的 action 并不会立即执行；当第二次触发 window#resize 事件时，如果两次事件发生的间隔小于 time，则仍然不执行 action，只有两次间隔大于 time 才会执行 action。

```js
var throttle = function (action, time) {
    var startTime = new Date();

    return function () {
        var ctx = this;
        var currentTime = new Date();

        if (currentTime - startTime > time) {
            action.apply(ctx);
            startTime = currentTime;
        }
    };
};

window.addEventListener('resize', throttle(function () {
    console.log('resize event')
}, 1000));
```

上面代码是 Throttle 的简单实现，当 window#resize 事件连续触发时，`throttle(action, time)` 中的 action 会每经过 time 时间就会触发一次。

## 参考资料

- [Debouncing and Throttling Explained Through Examples](https://css-tricks.com/debouncing-throttling-explained-examples/)
