---
title: promise
lang: zh-CN
---

### 含义
它由社区最早提出和实现，ES6将其写进了语言标准，统一了用法，原生提供了Promise对象。
所谓的Promise就是一容器，里面保存着某个未来才会结束事件的结。从语法上说，从它之中可以获取异步操作的的消息。

### 特点

#### 对象不受外界所干扰。
promise对象代表一个异步操作。它有三种状态分别为Pending（进行中）、Resolved（已完成，又称 Fulfilled）和Rejected（已失败）。
只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

#### 状态一旦确定就不会改变
Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。
只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果

:::tip
首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消

其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部

第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）
:::

#### 用法
Promise对象是一个构造函数，用来生成Promise实例
```js
 var promise = new Promise(function (resolve, reject) {
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
})
```
Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。
```js
promise.then(() =>{
   // success
}, () => {
  // failure
})
```
then方法可以接受两个回调函数作为参数。
第一个回调函数是Promise对象的状态变为Resolved时调用，第二个回调函数是Promise对象的状态变为Reject时调用。
其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。

#### 实例
```js
function timeout(ms) {
   return new Promise((resolve, reject) => {
      setTimeout(resolve, ms, 'done')
   })
}

timeout(100, then((value) => {
  console.log(value)
}))
```
上面代码中，timeout方法返回一个Promise实例，表示一段时间以后才会发生的结果。
过了指定的时间（ms参数）以后，Promise实例的状态变为Resolved，就会触发then方法绑定的回调函数。
:::tip 注意
Promise新建后就会立即执行。
:::

#### promise原理实现
1. 构造一个Promise实例需要给Promise构造函数传入一个函数。传入的函数需要有两个形参，两个形参都是function类型的参数。分别是resolve和reject
2. Promise上还有then方法，then 方法就是用来指定Promise 对象的状态改变时确定执行的操作，resolve 时执行第一个函数（onFulfilled），reject时执行第二个函数（onRejected）
3. 当状态变为resolve时便不能再变为reject，反之同理。
```js
function Promise(executor) {
  const _this = this;
  _this.status = 'pending';
  _this.successValue = undefined;
  _this.failValue = undefined;

  function resolve(value) {
    if (_this.status === 'pending') {
      _this.status = 'resolved';
      _this.successValue = value;
    }
  }

  function reject(reason) {
    if (_this.status === 'reject') {
      _this.status = 'rejected';
      _this.failValue = 'reject'
    }
  }
  executor(resolve, reject);
}

Promise.prototype.then = function(onFailed, onRejected) {
  const _this = this;
  if (_this.status === 'resolved') {
    onFailed(_this.successValue)
  }
  if (_this.status === 'rejected') {
    onRejected(_this.failValue);
  }
}
```

#### promise方法

##### Promise.prototype.then()
Promise实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法

##### promise.prototype.catch()
Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。

##### promise.all()
Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例.
```js
var p = Promise.all([p1, p2, p3])
```

##### Promise.race()
Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。

##### promise.resolve()
有时需要将现有对象转为Promise对象，Promise.resolve方法就起到这个作用。
```js
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

##### promise.reject()
Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

##### promise.try()
实际开发中，经常遇到一种情况：不知道或者不想区分，函数f是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管f是否包含异步操作，都用then方法指定下一步流程，用catch方法处理f抛出的错误。一般就会采用下面的写法。
```js
promise.resolve().then(f)
```
