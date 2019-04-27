---
title: Object的侦测方式
lang: zh-CN
---

### 如何监听数据变化
在js中通常有两种方法侦测出数据的变化：`Object.definedPrototype`，和ES6的Proxy。在Vue中使用的是`Object.definedPrototype`来侦测数据的变化。
```js
function definedReactive(data, key, val) {
  Object.definedProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      // do something
    },
    set: function () {
      // do something
    }
  })
}
```
通过封装函数definedReactive用来对ObjectProperty进行分装，其作用是定义一个响应式数据。
封装之后，每当从data的key中读取数据时，函数的get函数被触发；每当往data的key中设置数据时，set函数被触发；

### 搜集依赖

```html
<template>
  <h1>{{ content }}</h1>
</template>
```
上面的HTML模板中使用了数据content，当content发生变化的时候要向使用他的地方发送通知。所谓的依赖就是记录引用数据的地方
在Vue中利用Object.definedProperty中的get函数中搜集依赖，在get函数中的触发依赖；

#### 存储依赖

```js
function defineReactive(data, key, val) {
  let dep = []
  Object.definedProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      dep.push(window.target) // window.target这边看作依赖
      return val
    },
    set: function (newVal) {
      // do something
      if (val === newVal) return
      for (let i = 0; i < dep.length; i++) {
        dep[i](newVal, val)
      }
      val = newVal
    }
  })
}
```
新增dep数组用来存储依赖。

#### dep
```js
export default class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub() {
    remove(this.subs, sub)
  }

  depend() {
    if (window.target) this.addSub(window.target)
  }

  notify() {
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}

function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
```
现在再来配置改造一下defineReactive
```js
function defineReactive(data, key, val) {
  let dep = new Dep()
  Object.definedProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      dep.depend() // window.target这边看作依赖
      return val
    },
    set: function (newVal) {
      // do something
      if (val === newVal) return
      val = newVal
      dep.notify()
    }
  })
}
```

#### watcher
在Vue中实现了一个watcher，watcher是个中介角色，数据变化时候通知他，然后他在通知其他地方。
```js
export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm
    this.getter = parsePath(expOrFn)
    this.cb = cb
    this.value = this.get()
  }
  get() {
    window.target = this
    let value = this.getter.call(this.vm, this.vm)
    window.target = undefined
    return this.value
  }
  update() {
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
  }
}
```
:::tip
在get方法中先把window.terget设置成了this，也就是当前的Watcher实例，然后在读取值时自然就会触发getter。
触发了getter方法就会触发收集依赖的。
依赖添加到dep中时，每个值变化，就会让依赖列表的中的所有依赖触发update方法，也就是watcher中的update方法。而update方法会执行参数中的回调函数，并将value和oldValue传入。
:::

### 响应过程
 Data => Observer => (data.get, data.set) => dep => watcher => 外界
