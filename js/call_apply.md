---
title: 模拟call、apply
lang: zh-CN
---

### call
一句话介绍 call：
调用一个对象的一个方法，用另一个对象替换当前对象。例如：`B.call(A, args1,args2)`即A对象调用B对象的方法。

举个例子
```js
function add(a, b){
  return a + b
}
function sub(a, b){
  return a - b
}
var a1 = add.apply(sub, [4, 2])　　//sub调用add的方法
var a2 = sub.apply(add, [4, 2])
alert(a1)  //6     
alert(a2)  //2

var a1 = add.call(sub, 4, 2)
```

### apply
调用一个对象的一个方法，用另一个对象替换当前对象。例如：`B.apply(A, arguments)`即A对象应用B对象的方法。
```js
var arr1=new Array('1', '2', '3')
var arr2=new Array('4', '5', '6')

Array.prototype.push.apply(arr1, arr2)    
//得到合并后数组的长度，因为push就是返回一个数组的长度
```

:::tip 实际上
apply和call的功能是一样的，只是传入的参数列表形式不同。
:::

