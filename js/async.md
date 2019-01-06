---
title: async
lang: zh-CN
---

### ES6添加Promise大大的方便了异步的调用，ES7提出async，await来完善异步。

### async
```js
async function name (argument) {
  statements
}
```

### 特点

#### 返回值
* 当async函数在被声明的时候他会返回一个Promise
* 当async函数返回一个值时,这个值会当成Promise的resolve()的参数
* 当async函数抛出一个值时候,这个值会当成promise的reject()的参数

```js
// success
async function testAsync() {
  return 'success'
}
const t = testAsync()
t.then((a) => {
  console.log(a)
})

// fail
async function testAsync() {
  throw 'fail'
}
const t = testAsync()
t.then((a) => {
  console.log(a)
}, (a) => {
  console.log(a)
})

```

#### await
async函数中有个特殊字符await,await后面若是一个异步函数，则在异步函数完成之后继续执行
```js
function testSome(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x)
    }, 1000)
  })
}
async function test() {
  let a = await testSome(1)
  console.log(a)
}
test()
// 1

```

:::tip 解析
异步函数可以包含一个wait表达式，该表达式暂停异步函数的执行并等待传递的Promise的解析，然后恢复异步函数的执行并返回解析后的值。
:::