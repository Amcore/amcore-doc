---
title: CSS
lang: zh-CN
---

### BFC

块级格式化上下文，是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

:::tip IE
IE下为 Layout，可通过 zoom:1 触发
:::

#### 触发条件:
  * positon: absolute/fixed
  * display: inline-block / table
  * float 元素
  * ovevflow !== visible

#### 应用:
  * 阻止margin重叠
  * 可以包含浮动元素 —— 清除内部浮动(清除浮动的原理是两个div都位于同一个 BFC 区域之中)
  * 自适应两栏布局
  * 可以阻止元素被浮动元素覆盖

### 层叠上下文
元素提升为一个比较特殊的图层，在三维空间中 (z轴) 高出普通元素一等
#### 触发条件
* 根层叠上下文(html)
* position
* css3属性
  * flex
  * transform
  * opacity
  * filter
  * will-change
  * -webkit-overflow-scrolling
* 层叠等级：层叠上下文在z轴上的排序
  * 在同一层叠上下文中，层叠等级才有意义
  * z-index的优先级最高

![层叠等级](../assets/images/css-zIndex.jpg)

### 居中布局
* 水平居中
  * 行内元素: text-align: center
  * 块级元素: margin: 0 auto
  * absolute + transform
  * flex + justify-content: center
* 垂直居中
  * line-height: height
  * absolute + transform
  * flex + align-items: center
  * table
* 水平垂直居中
  * absolute + transform
  * flex + justify-content + align-items

### 选择器优先级
* !important > 行内样式 > #id > .class > tag > * > 继承 > 默认
* 选择器 从右往左 解析

### 去除浮动影响，防止父级高度塌陷
* 通过增加尾元素清除浮动
  * `after /<br>: clear: both`
* 创建父级 BFC
* 父级设置高度

### link 与 @import 的区别
* link功能较多，可以定义 RSS，定义 Rel 等作用，而@import只能用于加载 css
* 当解析到link时，页面会同步加载所引的 css，而@import所引用的 css 会等到页面加载完才被加载
* @import需要 IE5 以上才能使用
* link可以使用 js 动态引入，@import不行

### CSS预处理器(Sass/Less/Postcss)

### 动画
* `transition`: 过渡动画
  * `transition-property`: 属性
  * `transition-duration`: 间隔(s)
  * `transition-timing-function`: 曲线
    * `linear`: 动画从头到尾的速度是相同的。
    * `ease`: 默认。动画以低速开始，然后加快，在结束前变慢。
    * `ease-in`:	动画以低速开始
    * `ease-out`: 动画以低速结束
    * `ease-in-out`: 动画以低速开始和结束
    * `cubic-bezier`: 在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值
  * `transition-delay`: 延迟
  * 常用钩子: `transitionend`
* `animation / keyframes`
  * `animation-name`: 动画名称，对应`@keyframes`
  * `animation-duration`: 间隔(s)
  * `animation-timing-function`: 曲线(同上)
  * `animation-delay`: 延迟
  * `animation-iteration-count`: 次数
    * `infinite`: 无线循环
  * `animation-direction`: (反向:alternate)
* 动画属性: 尽量使用动画属性进行动画，能拥有较好的性能表现
  * translate
  * scale
  * rotate
  * skew
  * opacity
  * color