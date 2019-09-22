---
title: 前端工程化
lang: zh-CN
---

### 人们常说的前端工程化到底是什么？
前端工程本质上是软件工程的一种。
软件工程化关注的是性能、稳定性、可用性、可维护性等方面，注重基本的开发效率、运行效率的同时，思考维护效率。
一切以这些为目标的工作都是"前端工程化"。
工程化是一种思想而不是某种技术。举例说明：

要盖一栋大楼，假如我们不进行工程化的考量那就是一上来掂起瓦刀、砖块就开干，直到把大楼垒起来，这样做往往意味着中间会出现错误，要推倒重来或是盖好以后结构有问题但又不知道出现在哪谁的责任甚至会在某一天轰然倒塌，那我们如果用工程化的思想去做，就会先画图纸、确定结构、确定用料和预算以及工期，另外需要用到什么工种多少人等等，我们会先打地基再建框架再填充墙体这样最后建立起来的高楼才是稳固的合规的，什么地方出了问题我们也能找到源头和负责人。

### 前端工程化需要考虑哪些因素？

#### 模块化

简单来说，模块化就是将一个大文件拆分成相互依赖的小文件，再进行统一的拼装和加载。（方便了多人协作）。
分而治之是软件工程中的重要思想，是复杂系统开发和维护的基石，这点放在前端开发中同样适用。模块化是目前前端最流行的分治手段。

:::tip ''
模块化开发的最大价值应该是分治！
:::

* JS模块化方案

**AMD/CommonJS/UMD/ES6 Module**

**CommonJS**

CommonJS的核心思想是把一个文件当做一个模块，要在哪里使用这个模块，就在哪里require这个模块，
然后require方法开始加载这个模块并且执行其中的代码，最后会返回你指定的export对象

```js
module.export = function() {
  hello: function() {
    alert("你好");
  }
}
var a = require('./xxx/a.js');
// ==> 弹窗“你好”
a.hello();
```

:::tip
CommonJS 加载模块是同步的，所以只有加载完成才能执行后面的操作，不能非阻塞的并行加载多个模块。
:::

**AMD（异步模块定义，Asynchronous Module Definition）**

AMD特点是可以实现异步加载模块，等所有模块都加载并且解释执行完成后，才会执行接下来的代码。
```js
// 通过AMD载入模块
// define(
//   module_id /*可选*/,
//   [dependencies] 可选,
//   definition function /*回调 用来初始化模块或对象的函数*/
// );
define(['myModule', 'myOtherModule'], function(myModule, myOtherModule) {
  console.log(myModule.hello());
  //会先并行加载所有的模块a b 并执行其中模块的代码后，在执行逐步执行下面的 console
  require("a");
  console.log("a required");

  require("b");
  console.log("b required");

  console.log("all modules have been required");
});
```
在一些同时需要AMD和CommonJS功能的项目中，
你需要使用另一种规范：Universal Module Definition（通用模块定义规范）。
UMD创造了一种同时使用两种规范的方法，并且也支持全局变量定义。
所以UMD的模块可以同时在客户端和服务端使用。

**ES6 的模块**

ES6 的模块功能汲取了CommonJS 和 AMD 的优点，
拥有简洁的语法并支持异步加载，并且还有其他诸多更好的支持（例如导入是实时只读的。
（CommonJS 只是相当于把导出的代码复制过来））。

```js
// CommonJS代码
// lib/counter.js
var counter = 1;
function increment() {
  counter++;
}
function decrement() {
  counter--;
}
module.exports = {
  counter: counter,
  increment: increment,
  decrement: decrement
};
// src/main.js
var counter = require('../../lib/counter');
counter.increment();
console.log(counter.counter); // 1
```

```js
// 使用 es6 modules 通过 import 语句导入
// lib/counter.js
export let counter = 1;
export function increment() {
  counter++;
}
export function decrement() {
  counter--;
}
// src/main.js
import * as counter from '../../counter';
console.log(counter.counter); // 1
counter.increment();
console.log(counter.counter); // 2
```

* CSS模块化方案

在less、sass、stylus等预处理器的import/mixin特性支持下实现、css modules。

虽然SASS、LESS、Stylus等预处理器实现了CSS的文件拆分，但没有解决CSS模块化的一个重要问题：选择器的全局污染问题;
CSS in JS是彻底抛弃CSS，使用JS或JSON来写样式。这种方法很激进，不能利用现有的CSS技术，而且处理伪类等问题比较困难；
CSS Modules 原理：使用JS 来管理样式模块，它能够最大化地结合CSS生态和JS模块化能力，
通过在每个 class 名后带一个独一无二 hash 值，这样就不有存在全局命名冲突的问题了。

webpack 自带的 css-loader 组件，自带了 CSS Modules，通过简单的配置即可使用。

```js
{
  test: /\.css$/,
  loader: "css?modules&localIdentName=[name]__[local]--[hash:base64:5]"
}
```

#### 组件化
前端作为一种GUI软件，光有JS/CSS的模块化还不够，对于UI组件的分治也有着同样迫切的需求。
分治的确是非常重要的工程优化手段。

:::tip
页面上的每个 独立的 可视/可交互区域视为一个组件；
**每个组件对应一个工程目录**，组件所需的各种资源都在这个目录下就近维护；
由于组件具有独立性，因此组件与组件之间可以 自由组合；
页面只不过是组件的容器，负责组合组件形成功能完整的界面；
当不需要某个组件，或者想要替换组件时，可以整个目录删除/替换。
:::
由于系统功能被分治到独立的模块或组件中，粒度比较精细，组织形式松散，
开发者之间不会产生开发时序的依赖，大幅提升并行的开发效率，
理论上允许随时加入新成员认领组件开发或维护工作，也更容易支持多个团队共同维护一个大型站点的开发。

#### “智能”加载静态资源（性能优化）
模块化/组件化开发之后，我们最终要解决的，就是模块/组件加载的技术问题。
然而前端与客户端GUI软件有一个很大的不同：前端是一种远程部署，运行时增量下载的GUI软件。

如果用户第一次访问页面就强制其加载全站静态资源再展示，相信会有很多用户因为失去耐心而流失。
根据“增量”的原则，我们应该精心规划每个页面的资源加载策略，
使得用户无论访问哪个页面都能按需加载页面所需资源，没访问过的无需加载，访问过的可以缓存复用，最终带来流畅的应用体验。
**这正是Web应用“免安装”的魅力所在。**

:::tip
有加载相关的按需加载、延迟加载、预加载、请求合并等策略；
有缓存相关的浏览器缓存利用，缓存更新、缓存共享、非覆盖式发布等方案；

还有复杂的BigRender、BigPipe、Quickling、PageCache等技术。
这些优化方案无不围绕着如何将增量原则做到极致而展开。
:::

**一种静态网页资源管理和优化技术。(静态资源管理系统 = 资源表 + 资源加载框架)**

资源表是一份数据文件（比如JSON），
是项目中所有静态资源（主要是JS和CSS）的构建信息记录，通过构建工具扫描项目源码生成，
是一种k-v结构的数据，以每个资源的id为key，记录了资源的类别、部署路径、依赖关系、打包合并等内容。

在查表的时候，如果一个静态资源有pkg字段(用来记录web应用中一个页面加载过的静态资源，
当下个页面用到这个资源就无需加载了，有效利用缓存)，
那么就去加载pkg字段所指向的打包文件，否则加载资源本身。

#### 规范化
规范化其实是工程化中很重要的一个部分，项目初期规范制定的好坏会直接影响到后期的开发质量。

* 目录结构的制定
* 编码规范
* 前后端接口规范
* 文档规范
* 组件管理
* Git分支管理
* Commit描述规范
* 定期CodeReview
* 视觉图标规范

#### 自动化
任何简单机械的重复劳动都应该让机器去完成。

* 图标合并
* 持续集成
* 自动化构建
* 自动化部署
* 自动化测试
