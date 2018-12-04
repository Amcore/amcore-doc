---
title: render函数
lang: zh-CN
---

### render函数
Vue 推荐在绝大多数情况下使用template来创建你的 HTML。
然而在一些场景中，你真的需要JavaScript的完全编程的能力，这就是render函数，它比template更接近编译器。
vue提供了render函数大大的提高了JavaScript的编程能力，虽然在日常的使用中是比较少见的但是理解render函数对应加深对Vue组件的使用都是很有帮助的。
下面我们就针对render函数进行探讨。

render函数提供一个createElement，而createElement可接受三个参数具体情况如下：

#### `createElement`和它的参数

```js
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签字符串，组件选项对象，或者
  // 解析上述任何一种的一个 async 异步函数。必需参数。
  'div',

  // {Object}
  // 一个包含模板相关属性的数据对象
  // 你可以在 template 中使用这些特性。可选参数。
  {
    'class': {
        container: true
      },
      style: {
        cursor: 'pointer'
      },
      domProps: {
        innHTML: 'baz'
      }
  },

  // {String | Array}
  // 子虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选参数。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

#### Vue提供的实例方法在render函数中使用
```js
Vue.components('dom-input', {
    render: function (createElement) {
      const _this = this;
      return createElement('div', {
        domPopps: {
          value: _this.name
        },
        on: {
          input: function () {
            _this.$emit('input', event.taget.value);
          }
        }
      });
    },
    props: {
      value: String
    }
  });
  new Vue({
    el: '#app',
    data: {
      pValue: ''
    }
  });
```
上面的例子中我们创建了一个input组件，在组件中当输入的触发了input事件emit了input的value；
而在外层中接受了这个value让pValue的值等于value。
而pValue又通过props把值传入input组件中从而实现了类似v-model的数据绑定。

:::tip
通过了上面render函数的一个例子我们看到了props和事件的触发的使用。
:::
