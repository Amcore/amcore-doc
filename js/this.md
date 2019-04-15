---
title: JavaScript中的this
lang: zh-CN
---
### 关于this的误解
----
人们很容易把this理解成指向函数自身，这个推断从英语的语法角度来说是说得通的。但是首先需要消除一些关于this的错误认识。太拘泥于“this”的字面意思就会产生一些误解。有两种常见的对于this的解释，但是它们都是错误的。

### this的几种绑定
---
#### 默认绑定
思考一下下面这段代码
```js
function foo () {
  console.log(this.a);
}
var a = 2;
foo(); // 2
```
在上面的例子中this.a解析为了全局变量中的a，因为在本 例中，函数调用时应用了 this 的默认绑定，因此 this 指向全局对象。可以通过分析调用位置来看看 foo() 是如何调 用的。在代码中，foo() 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用 默认绑定，无法应用其他规则。
如果使用严格模式(strict mode)，那么全局对象将无法使用默认绑定，因此this会绑定 到 undefined:
```js
function foo() {
  'use strict'
  console.log(this.a);
}
var a = 2;
foo();
// TypeError: this is undefined
```
这里有一个微妙但是非常重要的细节，虽然 this 的绑定规则完全取决于调用位置，但是只 有foo()运行在非strict mode下时，默认绑定才能绑定到全局对象;严格模式下与foo() 的调用位置无关:
```js
function foo() { console.log( this.a );
}
var a = 2;
(function(){ 
  "use strict";
    foo(); // 2
})();
```
>通常来说你不应该在代码中混合使用strict mode和non-strict mode。整个 程序要么严格要么非严格。然而，有时候你可能会用到第三方库，其严格程 度和你的代码有所不同，因此一定要注意这类兼容性细节。

#### 隐式绑定
另一条需要考虑的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包
含，不过这种说法可能会造成一些误导。
思考下面的代码:
```js
function foo() {
  console.log( this.a );
}
var obj={
  a: 2,
  foo: foo
};
obj.foo();
// 2
```
首先需要注意的是 foo() 的声明方式，及其之后是如何被当作引用属性添加到 obj 中的。 但是无论是直接在 obj 中定义还是先定义再添加为引用属性，这个函数严格来说都不属于 obj 对象。
然而，调用位置会使用 obj 上下文来引用函数，因此你可以说函数被调用时 obj 对象“拥 有”或者“包含”它。
无论你如何称呼这个模式，当 foo() 被调用时，它的落脚点确实指向 obj 对象。当函数引 用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。因为调 用 foo() 时 this 被绑定到 obj，因此 this.a 和 obj.a 是一样的。
对象属性引用链中只有最顶层或者说最后一层会影响调用位置。举例来说:
```js
function foo() {
  console.log( this.a );
}
var obj2 = {
  a: 42,
  foo: foo
};
var obj1 = {
  a: 2,
  obj2: obj2
};
obj1.obj2.foo();
// 42
```
#### 隐式丢失
一个最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 this 绑定到全局对象或者 undefined 上，取决于是否是严格模式。 思考下面的代码:
```js
function foo() {
  console.log( this.a );
}
var obj={
  a: 2,
  foo: foo
};
var bar = obj.foo;
// 函数别名!
var a = "oops, global";
// a 是全局对象的属性 bar(); // "oops, global"
```
参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值，所以结果和上一 个例子一样。

#### 显式绑定
思考下面的代码:
```js
function foo() {
  console.log( this.a );
}
var obj = {
  a:2
};
foo.call( obj ); // 2
```
通过 foo.call(..)，我们可以在调用 foo 时强制把它的 this 绑定到 obj 上。
如果你传入了一个原始值(字符串类型、布尔类型或者数字类型)来当作 this 的绑定对 象，这个原始值会被转换成它的对象形式(也就是new String(..)、new Boolean(..)或者 new Number(..))。这通常被称为“装箱”。
1. 硬绑定
但是显式绑定的一个变种可以解决这个问题。
思考下面的代码:
```js
function foo () {
  console.log(this.a);
}
var obj = {
  a: 2
}
var bar = function () {
  foo.call(obj);
}
bar();
setTimeout(bar, 100); // 2
// 硬绑定的 bar 不可能再修改它的
this bar.call( window ); // 2
```
我们来看看这个变种到底是怎样工作的。我们创建了函数 bar()，并在它的内部手动调用 了 foo.call(obj)，因此强制把 foo 的 this 绑定到了 obj。无论之后如何调用函数 bar，它 总会手动在 obj 上调用 foo。这种绑定是一种显式的强制绑定，因此我们称之为硬绑定

#### new绑定

这是第四条也是最后一条 this 的绑定规则，在讲解它之前我们首先需要澄清一个非常常见
的关于 JavaScript 中函数和对象的误解。 在传统的面向类的语言中，“构造函数”是类中的一些特殊方法，使用 new 初始化类时会
调用类中的构造函数。通常的形式是这样的:
     something = new MyClass(..);
JavaScript 也有一个 new 操作符，使用方法看起来也和那些面向类的语言一样，绝大多数开 发者都认为 JavaScript 中 new 的机制也和那些语言一样。然而，JavaScript 中 new 的机制实 际上和面向类的语言完全不同。
首先我们重新定义一下 JavaScript 中的“构造函数”。在 JavaScript 中，构造函数只是一些 使用 new 操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上， 它们甚至都不能说是一种特殊的函数类型，它们只是被 new 操作符调用的普通函数而已。
举例来说，思考一下 Number(..) 作为构造函数时的行为，ES5.1 中这样描述它:Number 构造函数
当 Number 在 new 表达式中被调用时，它是一个构造函数:它会初始化新创建的 对象。
使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
1. 创建(或者说构造)一个全新的对象。
2. 这个新对象会被执行[[原型]]连接。
3. 这个新对象会绑定到函数调用的this。
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。
我们现在关心的是第 1 步、第 3 步、第 4 步，所以暂时跳过第 2 步，第 5 章会详细介绍它。 思考下面的代码:
```js
function foo(a) {
  this.a = a;
}
var bar = new foo(2);
console.log( bar.a ); // 2
```
使用 new 来调用 foo(..) 时，我们会构造一个新对象并把它绑定到 foo(..) 调用中的 this 上。new 是最后一种可以影响函数调用时 this 绑定行为的方法，我们称之为 new 绑定。

::: tip 优先级
new > 显示绑定 > 隐性绑定 >默认绑定
:::

### 小结
---
如果要判断一个运行中函数的 this 绑定，就需要找到这个函数的直接调用位置。找到之后
就可以顺序应用下面这四条规则来判断 this 的绑定对象。
1. 由new调用?绑定到新创建的对象。
2. 由call或者apply(或者bind)调用?绑定到指定的对象。
3. 由上下文对象调用?绑定到那个上下文对象。
4. 默认:在严格模式下绑定到undefined，否则绑定到全局对象。
一定要注意，有些调用可能在无意中使用默认绑定规则。如果想“更安全”地忽略 this 绑 定，你可以使用一个 DMZ 对象，比如 ø = Object.create(null)，以保护全局对象。
ES6 中的箭头函数并不会使用四条标准的绑定规则，而是根据当前的词法作用域来决定 this，具体来说，箭头函数会继承外层函数调用的 this 绑定(无论 this 绑定到什么)。这 其实和 ES6 之前代码中的 self = this 机制一样。this.
