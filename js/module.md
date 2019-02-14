---
title: module
lang: zh-CN
---

在ES6 Module出现之前，模块化一直是前端开发者讨论的重点，面对日益增长的需求和代码，需要一种方案来将臃肿的代码拆分成一个个小模块，从而推出了AMD,CMD和CommonJs这3种模块化方案，前者用在浏览器端，后面2种用在服务端，直到ES6 Module出现
模块化

模块化开发在现代开发中已是必不可少的一部分，它大大提高了项目的可维护、可拓展和可协作性。通常，我们 在浏览器中使用 ES6 的模块化支持，在 Node 中使用 commonjs 的模块化支持。

* 分类:
  * es6: import / exports
  * commonjs: require / module.exports / exports
  * amd: require / defined
* require与import的区别
  * require支持 动态导入，import不支持，正在提案 (babel 下可支持)
  * require是 同步 导入，import属于 异步 导入
  * require是 值拷贝，导出值变化不会影响导入值；import指向 内存地址，导入值会随导出值而变化

:::tip 提示
ES6 Module默认目前还没有被浏览器支持，需要使用babel
:::

### 特点
1. ES6 Module是静态的，也就是说它是在编译阶段运行，和var以及function一样具有提升效果（这个特点使得它支持tree shaking）
2. 自动采用严格模式（顶层的this返回undefined）
3. ES6 Module支持使用export {<变量>}导出具名的接口，或者export default导出匿名的接口

module.js
```js
let x = 10
let y = 20

export {
  x
}
export default {
  y
}
```

main.js
```js
import {
  x
} from './module.js'
import y from 'module.js'
```
这两者的区别是，export {<变量>}导出的是一个变量的引用，export default导出的是一个值
看下面例子
module.js
```js
let x = 10
let y = 20

setTimeout(() => {
  x = 100
  y = 200
}, 1000)

export {
  x
}
export default y
```
main.js
```js
import {
  x
} from './module.js'
import y from './module.js'

console.log(x, y) // 10 20
setTimeout(() => {
  console.log(x, y) // 100 20
}, 1000)
```

可以看到给module.js设置了一个一秒后改变x,y变量的定时器,在一秒后同时观察导入时候变量的值,可以发现x被改变了,但y的值仍是20,因为y是通过export default输出的,在导入的时候的值相当于只是导入20这个数字,而x是通过export {<变量>}导出的,它导出的是一个变量的引用,即main.js导入的是当前x的值,只关心当前x变量的值是什么,可以理解为一个"活链接"

这里再来说一下目前为止主流的模块化方案ES6 Module和CommonJs的一些区别
1. CommonJs输出的是一个值的拷贝,ES6 Module通过export {<变量>}输出的是一个变量的引用,export default输出的是一个值的拷贝
2. CommonJs运行在服务器上,被设计为运行时加载,即代码执行到那一行才回去加载模块,而ES6 Module是静态的输出一个接口,发生了编译的阶段
3. CommonJs在第一次加载的时候运行一次,之后加载返回的都是第一次的结果,具有缓存的效果,ES6 Module则没有
