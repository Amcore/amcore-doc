---
title: Vue生命周期
lang: zh-CN
---

### 生命周期图示
---
下图展示了实例的生命周期。你不需要立马弄明白所有的东西，不过随着你的不断学习和使用，它的参考价值会越来越高。
![vue-lifecycle](../assets/images/lifecycle.png)

#### 初始化阶段
在new Vue()到created之间的阶段叫做初始化阶段，这个阶段主要目的是在Vue.js实例上初始化一些属性
、事件以及响应数据，如props、methods、computed、watch、provide和inject等

#### 模板编译阶段
在created钩子函数与beforeMounte钩子函数之间的阶段是模板编译阶段。这阶段是的主要目的是将模板编译
为渲染函数。

#### 挂载阶段
在这个阶段Vue.js会将其实力挂载在DOM元素上，通俗的说就是将模板渲染到指定DOM元素中。在挂载的过程中，
Vue.js会开启Watcher来追踪依赖的变化。

#### 卸载阶段
应用调用了vm.$destory方法后，vue.js的生命周期会进入卸载阶段。在这个阶段，Vue.js会将自身从父组件
中删除，取消实例上的所有依赖的追踪并且移除所有的事件监听。

* _init_
  * `initLifecycle/Event`，往`vm`上挂载各种属性
  * `callHook: beforeCreated`: 实例刚创建
  * `initInjection/initState`: 初始化注入和 `data` 响应性
  * `created`: 创建完成，属性已经绑定， 但还未生成真实`dom`
  * 进行元素的挂载：` $el / vm.$mount()`
  * 是否有`template`: 解析成`render function`
    *.vue文件: `vue-loader`会将`<template>`编译成`render function`
  * `beforeMount`: 模板编译/挂载之前
  * 执行`render function`，生成真实的`dom`，并替换到`dom tree`中
  * `mounted`: 组件已挂载
* `update`:
  * 执行`diff`算法，比对改变是否需要触发UI更新
  * `flushScheduleQueue`
    * `watcher.before`: 触发`beforeUpdate`钩子		- `watcher.run()`: 执行`watcher`中的 `notify`，通知所有依赖项更新UI
  * 触发`updated`钩子: 组件已更新
* `actived / deactivated(keep-alive)`: 不销毁，缓存，组件激活与失活
* `destroy`:
  * `beforeDestroy`: 销毁开始
  * 销毁自身且递归销毁子组件以及事件监听
    * `remove()`: 删除节点
    * `watcher.teardown()`: 清空依赖
    * `vm.$off()`: 解绑监听
* `destroyed`: 完成后触发钩子

上面是vue的声明周期的简单梳理，接下来我们直接以代码的形式来完成vue的初始化
```js
new Vue({})

// 初始化Vue实例
function _init() {
	// 挂载属性
  initLifeCycle(vm)
  // 初始化事件系统，钩子函数等
  initEvent(vm)
  // 编译slot、vnode
  initRender(vm)
  // 触发钩子
  callHook(vm, 'beforeCreate')
  // 添加inject功能
  initInjection(vm)
  // 完成数据响应性 props/data/watch/computed/methods
  initState(vm)
  // 添加 provide 功能
  initProvide(vm)
  // 触发钩子
  callHook(vm, 'created')
  // 挂载节点
  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}

// 挂载节点实现
function mountComponent(vm) {
  // 获取 render function
  if (!this.options.render) {
    // template to render
    // Vue.compile = compileToFunctions
    let { render } = compileToFunctions()
    this.options.render = render
  }
  // 触发钩子
  callHook('beforeMounte')
  // 初始化观察者
  // render 渲染 vdom，
  vdom = vm.render()
  // update: 根据 diff 出的 patchs 挂载成真实的 dom
  vm._update(vdom)
  // 触发钩子  
  callHook(vm, 'mounted')
}

// 更新节点实现
function queueWatcher(watcher) {
  nextTick(flushScheduleQueue)
}

// 清空队列
function flushScheduleQueue() {
	 // 遍历队列中所有修改
  for(){
    // beforeUpdate
    watcher.before()
    // 依赖局部更新节点
    watcher.update()
    callHook('updated')
  }
}

// 销毁实例实现
Vue.prototype.$destory = function() {
	// 触发钩子
  callHook(vm, 'beforeDestory')
  // 自身及子节点
  remove()
  // 删除依赖
  watcher.teardown()
  // 删除监听
  vm.$off()
  // 触发钩子
  callHook(vm, 'destoryed')
}
复制代码

```
