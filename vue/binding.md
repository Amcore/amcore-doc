---
title: Vue双向绑定
lang: zh-CN
---

## 原理
Vue 的响应依赖于Object.defineProperty,这也是Vue不支持IE8的原因。
Vue通过设定对象属性的setter/getter方法来监听数据的变化。
通过getter进行依赖收集，而每个setter方法就是一个观察者，在数据变更的时候通知订阅者更新视图。

## 实现过程
### 一段简单的demo
```vue
<template>
  <input type="text" id="a"/>
  <span id="b"></span>
</template>

<script>
  const obj = {};
  Object.defineProperty(obj,'hello', {
    get() {
      console.log("啦啦啦，方法被调用了");
    },
    set(newVal) {
      document.getElementById('a').value = newVal
      document.getElementById('b').innerHTML = newVal
    }
  })
  document.addEventListener('keyup', function(e) {
    obj.hello = e.target.value
  })
</script>
```
通过Object.defineProperty这个方法，input中的keyup事件触发的时候obj中的hello
值被赋值input的value，当对obj.hello赋值触发了set方法，在set方法中改变了inpt的值。

### vue中的双向绑定
1. 实现一个数据监听器Observer()，能够对数据对象的所有属性进行监听，如有变动可以拿到最新值并通知订阅者
2. 实现一个指令解析器Compile(),对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
3. .实现一个Watcher()，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图

#### 定义一个Vue对象
```js
function Vue(options) {
  this._init(options)
}

Vue.prototype._init = function (options) {
  this.$options = options
  this.$el = document.querySelector(options.el)
  this.$data = options.data
  this.$methods = options.methods
  // 定义一个绑定对象，用于存放对象
  this._binding = {}
  // 观察者
  this._obverse(this.$data)
  // 解析器
  this._compile(this.$el)
}
```

#### 观察者（observable）
 ```js
 function _obverse () {
   let value
   // 遍历对象，收集绑定的数据
   for (key in obj) {
     if (obj.hasOwnProperty(key)) {
       this._binding[key] = {
         _directives = []
       }
       value = obj[key]
       // 做个迭代
       if (typeof value === 'object') this._obverse(value)

       let binding = this._binding[key]
       Object.defineProperty(
         this.$data,
         key,
         {
           enumerable: true,
           configurable: true,
           get: function () {
             // 更新
             if (value !== newVal) {
               value = newVal
               binding._directives.forEach(function (item) {
                 item.update()
               })
             }
           }
         }
       )
     }
   }
 }
```
::: tip
* 利用Obeject.defineProperty()来监听属性变动
* 需要将observer的数据进行递归遍历，包括子属性对象的属性，都加上setter和getter
* 给某个对象赋值，就会触发setter,那么就能监听到数据变化，通过notify()发布出去
:::

#### 解析器（compile）
```js
Vue.prototype._compile = function (root) {
  let _this = this
  let nodes = root.children
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i]
    if (node.children.length) {
      this._compile(node)
    }
    if (node.hasOwnProperty('v-click')) {
      node.click = (function () {
        let attrVal = node[i].getAttribute('v-click')
        return this.$methods[attrVal].bind(_this.$data)
      })();
    }
    if (
      node.hasOwnProperty('v-model') &&
      (
        node.tagName = 'INPUT' ||
        node.tagName = 'TEXTAREA'
      )
    ) {
      node.addEventListener(
        'input',
        (function (key) {
          let attrVal = node.getAttribute('v-model')
          _this._binding[attrVal]._directives.push(
            new Watch(
              'input',
              node,
              _this,
              attrVal,
              'value'
            )
          )
          return function () {
            _this.$data[attrVal] = node[key].value
          }
        })(i)
      )
    }

    if (node.hasOwnProperty('v-bind')) {
      let attrVal = node.getAttribute('v-bind')
      _this._binding[attrVal]._directives.push(
        new Watch(
          'text',
          node,
          _this,
          attrVal,
          'innerHTML'
        )
      )
    }
  }
}
```
::: tip
* compile主要是解析模板指令，将模板的变量替换成数据，然后初始化渲染页面视图
* 并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变化，收到通知，更新视图
:::
#### Watcher
Watcher订阅者为Observer和Compile之间通信的桥梁

```js
function Watcher (
  name,
  el,
  vm,
  attr,
  exp
) {
  this.name = name
  this.el = el
  this.vm = vm
  this.attr = attr
  this.exp = exp
  this.update()
}

Watch.prototype.update = function () {
  this.$el[this.attr] = this.vm.$data[this.exp]
}
```
::: tip
* 在Compile中实例化时
* 往属性订阅器(dep)里添加在自己
* 自身必须有一个update()方法
* 当数据变动是接到dep属性订阅器的notify发布通知时，能够调用自身的update()方法, 从而触发get方法去更新数据
:::
