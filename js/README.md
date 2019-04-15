---
title: JS
lang: zh-CN
---

###  原型 / 构造函数 / 实例（见prototype）

### 闭包
闭包属于一种特殊的作用域，称为 静态作用域。它的定义可以理解为: 父函数被销毁 的情况下，返回出的子函数的`[[scope]]`中仍然保留着父级的单变量对象和作用域链，因此可以继续访问到父级的变量对象，这样的函数称为闭包。

* 闭包会产生一个很经典的问题:
  * 多个子函数的[[scope]]都是同时指向父级，是完全共享的。因此当父级的变量对象被修改时，所有子函数都受到影响。
* 解决
  * 变量可以通过 函数参数的形式 传入，避免使用默认的[[scope]]向上查找
  * 使用setTimeout包裹，通过第三个参数传入
  * 使用 块级作用域，让变量成为自己上下文的属性，避免共享

### script 引入方式
  * html 静态`<script>`引入
  * js 动态插入`<script>`
:::tip 加载
* `<script defer>`: 异步加载，元素解析完成后执行
* `<script async>`: 异步加载，与元素渲染并行执行
:::

### 对象的拷贝
* 浅拷贝: 以赋值的形式拷贝引用对象，仍指向同一个地址，修改时原对象也会受到影响
  * `Object.assign`
  * `展开运算符(...)`
* 深拷贝: 完全拷贝一个新对象，修改时原对象不再受到任何影响
  * `JSON.parse(JSON.stringify(obj))`: 性能最快
  :::tip 注意
  * 具有循环引用的对象时，报错
  * 当值为函数或undefined时，无法拷贝
  :::
  * 递归进行逐一赋值

### instanceof原理
能在实例的 原型对象链 中找到该构造函数的prototype属性所指向的 原型对象，就返回true。即:
```js
// __proto__: 代表原型对象链
instance.[__proto__...] === instance.constructor.prototype

// return true
```
### new 操作符做了什么?
`const obj = new Base()`
该一步共做了三件事，即
* `var obj = {}` // 创建一个空对象
* `obj.__proto__ = Base.prototype` // 我们将这个空对象的__proto__成员指向了Base函数对象prototype成员对象
* `Base.call(obj)` // 我们将Base函数对象的this指针替换成obj
实现
```js
function New (fun) {
  var res = {}
  if (fun.prototype !== null) {
    res.__proto__ === res.prototype
  }
  var ret = func.apply(res, Array.prototype.slice.call(argument, 1))
  if ((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
    return ret
  }
  return res
}
```
### 继承
在 JS 中，继承通常指的便是 原型链继承，也就是通过指定原型，并可以通过原型链继承原型上的属性或者方法。
* 最优化: 圣杯模式
```js
var inherit = (function(c,p){
	var F = function(){};
	return function(c,p){
		F.prototype = p.prototype;
		c.prototype = new F();
		c.uber = p.prototype;
		c.prototype.constructor = c;
	}
})();
```
* 使用 ES6 的语法糖 `class / extends`

### 类型转换

### 类型判断
判断 Target 的类型，单单用 typeof 并无法完全满足，这其实并不是 bug，本质原因是 JS 的万物皆对象的理论。因此要真正完美判断时，我们需要区分对待:
* 基本类型`(null)`: 使用 `String(null)`
* 基本类型(`string` / `number` / `boolean` / `undefined`) + `function`: 直接使用 `typeof`即可
* 其余引用类型(`Array` / `Date` / `RegExp Error`): 调用`toString`后根据`[object XXX]`进行判断
很稳的判断封装:
```js
let classType = {}
'Array Date RegExp Object Error'.split(' ').forEach(() => classType['[object' + e + ']'])
function type(obj) {
  if (obj === null) return String(obj)
  return typeof obj === 'object' ? classType[Object.prototype.toString.call(obj)] || 'object' : typeof obj
}
```

### this(见this)

### babel编译原理
* babylon 将 ES6/ES7 代码解析成 AST
* babel-traverse 对 AST 进行遍历转译，得到新的 AST
* 新 AST 通过 babel-generator 转换成 ES5

### 数组(array)
* `map`: 遍历数组，返回回调返回值组成的新数组
* `forEach`: 无法`break`，可以用`try/catch中throw new Error`来停止
* `filter`: 过滤
* `some`: 有一项返回true，则整体为true
* `every`: 有一项返回false，则整体为false
* `join`: 通过指定连接符生成字符串
* `push / pop`: 末尾推入和弹出，改变原数组， 返回推入/弹出项
* `unshift / shift`: 头部推入和弹出，改变原数组，返回操作项
* `sort(fn) / reverse`: 排序与反转，改变原数组
* `concat`: 连接数组，不影响原数组， 浅拷贝
* `slice(start, end)`: 返回截断后的新数组，不改变原数组
* `splice(start, number, value...)`: 返回删除元素组成的数组，value 为插入项，改变原数组
* `indexOf / lastIndexOf(value, fromIndex)`: 查找数组项，返回对应的下标
* `reduce / reduceRight(fn(prev, cur)， defaultPrev)`: 两两执行，`prev` 为上次化简函数的`return`值，`cur` 为当前值(从第二项开始)
* 数组乱序：
```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.sort(function () {
    return Math.random() - 0.5;
});
```
* 数组拆封
```js
arr.prototype.flat = function() {
    this.toString().split(',').map(item => +item )
}
```