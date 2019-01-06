---
title: Generator
lang: zh-CN
---

### Generator
___
Generator用来定义“函数生成器”，它的特点是可以中断函数的执行，生成器函数在执行时能暂停，后面又能从暂停处继续执行。
调用一个生成器函数并不会马上执行它里面的语句，而是返回一个这个生成器的 迭代器 （iterator ）对象。当这个迭代器的 `next()` 方法被首次（后续）调用时，其内的语句会执行到第一个（后续）出现yield的位置为止，yield 后紧跟迭代器要返回的值。或者如果用的是 `yield*`（多了个星号），则表示将执行权移交给另一个生成器函数（当前生成器暂停执行）。

`next()`方法返回一个对象，这个对象包含两个属性：`value` 和 `done`，`value` 属性表示本次 `yield` 表达式的返回值，`done` 属性为布尔类型，表示生成器后续是否还有 `yield` 语句，即生成器函数是否已经执行完毕并返回。

调用`next()`方法时，如果传入了参数，那么这个参数会作为上一条执行的`yield`语句的返回值

#### 语法
`function* name([param[, param[, ... param]]]) { statements }`
#### 例子
```js
function* gen() {
    yield 10;
    y = yield 'foo';
    yield y;
}
var gen_obj = gen();

console.log(gen_obj.next());
// 执行 yield 10，返回 10
console.log(gen_obj.next());
// 执行 yield 'foo'，返回 'foo'
console.log(gen_obj.next(10));
// 将 10 赋给上一条 yield 'foo' 的左值，即执行 y=10，返回 10
console.log(gen_obj.next());
// 执行完毕，value 为 undefined，done 为 true
```
:::tip 注意
* 当在生成器函数中显式 return 时，会导致生成器立即变为完成状态，即调用 next() 方法返回的对象的 done 为 true。
* 如果 return 后面跟了一个值，那么这个值会作为当前调用 next() 方法返回的 value 值。(函数返回结束)
:::

#### 执行权转交

`yield*`(多个星号)表示将执行权移交给另一个生成器函数（当前生成器暂停执行）

 ```js
 function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i){
  yield i;
  yield* anotherGenerator(i);// 移交执行权
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); 
// output: 10
console.log(gen.next().value); 
// output: 11
console.log(gen.next().value); 
// output: 12
console.log(gen.next().value); 
// output: 13
console.log(gen.next().value); 
// output: 20
```

#### 传递参数
 ```js
 function *createIterator() {
    let first = yield 1;
    let second = yield first + 2;
    yield second + 3;
}

let iterator = createIterator();

console.log(iterator.next());
// output: { value: 1, done: false }
console.log(iterator.next(4));
// 4 + 2
// output: { value: 6, done: false }
console.log(iterator.next(5));
// 5 + 3
// output: { value: 8, done: false }
console.log(iterator.next());
// output: { value: undefined, done: true }
 ```

#### 显示返回
```js
function* yieldAndReturn() {
  yield "Y";
  return "R";//显式返回处，可以观察到 done 也立即变为了 true
  yield "unreachable";// 不会被执行了
}
var gen = yieldAndReturn()

console.log(gen.next());
// output: { value: "Y", done: false }
console.log(gen.next());
// output: { value: "R", done: true }
console.log(gen.next());
// output: { value: undefined, done: true }
```

:::tip 生成器函数不能当构造器使用节
`function* f() {}`
`var obj = new f;` // throws "TypeError: f is not a constructor"
:::

#### 运用
```js
function* changeArr(arr) {
  if (Array.isArray(arr)) {
    for (let i = 0; i < arr.length; i++) {
      yield* changeArr(arr[i])
    }
  } else {
    yield arr
  }
}

let arr = ['a', ['b', 'c'], 'd']
for (let x of (changeArr(arr))) {
  console.log(x)
}
// output: a b c d
```