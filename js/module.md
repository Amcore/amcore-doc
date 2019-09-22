---
title: module
lang: zh-CN
---
### CommmonJs
在SPA(单页面应用)出现之前，一个web应用由很多单独的页面组成，每个页面的逻辑都相对简单，
使用一些简单的模块创建方法就可以很好的构建这些页面的逻辑了。
直到JavaScript被应用到服务器端，事情发生了变化。
在服务器端，逻辑就复杂多了，也不能像前端一样各个页面去分担不同的功能，
所以必须要有一种模块化的方式来管理代码。**NodeJS选择了CommonJS作为它的模块化的规范**。

CommonJS使用exports导出需要被其他模块使用的对象；使用require导入需要使用的被其他模块暴露出来的对象。

下面是一个CommonJS的示例：

```js
var todoList = {
  showList: function () {
    var todoItem = require('todoItem')
    if (todoItem.needShowTime) {
      var todoTime = require('todoTime')
      todoTime.showTime()
    }
    console.log('showList')
  }
}

exports.todoList = todoList

```
CommonJS是一种同步的模块加载方式。
在执行require(‘todoItem’)的时候，会一直等到todoItem被加载完，才会执行后面的代码。
这在服务器端是可行的，因为需要require的资源在本地，所以获取资源并不会有太大的时间消耗。
但当开发者想把这种模式应用于前端的时候，发现同步加载不是一个好办法。
在加载require(‘todoItem’)的时候，需要去远端的服务器上获取模块，
在同步的情况下，获取模块的过程中，不能执行其他任何操作，就会造成页面的假死，影响用户体验。

### AMD
在CommonJS之后，为了创建适合前端的模块化规范，就有了AMD (异步模块定义)。
AMD是一种可以进行异步加载的模块化规范，因而它很适用于前端开发。

AMD使用define定义模块；使用require加载依赖。下面的代码实现了CommonJS的示例中的相同功能。
```js
define('todoList', ['todoItem'], (todoItem) => {
  var todoList = {
    showList: function () {
      if (todoItem.showTime) {
        require(['todoItem'], (todoItem) => {
          todoTime.showTime()
        })
        console.log('showList')
      }
    }
  }
  return todoList
})
```
AMD与CommonJs最大的不同体现在require上。在CommonJs中，require方法只有一个参数，
就是需要被require的module，而在AMD中，require方法有两个参数，一个是被require的module，
一个是callback函数。

AMD在require的模块加载完成后，会调用callback方法。
而在获取require的模块的过程中，是可以继续执行后面的代码的，如console.log(‘showlist’);，
这样页面就可以继续响应用户的其他操作，这就是AMD异步的加载方式所带来的好处。
常用的RequireJS就是这样的一种机制，而AMD是RequireJS在推广过程中对模块定义的规范化产出。

```js
// CommonJS 同步加载模块
var todoTime = require('todoTime');
todoTime.showTime();

// AMD 异步加载模块
require(['todoTime'], (todoTime) => {
  todoTime.showTime();
});
```

### CMD
CMD和AMD一样，都是异步加载模块的规范。当讨论到CMD和AMD的不同时，通常会说AMD是依赖前置，而CMD是依赖就近。
:::tip
AMD在后来也实现了依赖就近，文中在讲述AMD时所给的示例，就可以算是一种依赖就近，只是AMD的官方还是比较推荐依赖前置这种写法。
:::

### ES6中的模块
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

#### 特点
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
