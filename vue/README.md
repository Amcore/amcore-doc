---
title: Vue
lang: zh-CN
---

### 原理
---
Vue 的响应依赖于Object.defineProperty,这也是Vue不支持IE8的原因。
Vue通过设定对象属性的setter/getter方法来监听数据的变化。
通过getter进行依赖收集，而每个setter方法就是一个观察者，在数据变更的时候通知订阅者更新视图。

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

:tada: :100:

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::
