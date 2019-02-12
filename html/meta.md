---
title: meta标签
lang: zh-CN
---

### meta
标签提供关于HTML文档的元数据。元数据不会显示在页面上，但是对于机器是可读的。它可用于浏览器（如何显示内容或重新加载页面），搜索引擎(关键词)

### mate属性
**name**
name 属性提供了名称/值对中的名称。HTML 和 XHTML 标签都没有指定任何预先定义的 <meta> 名称。通常情况下，您可以自由使用对自己和源文档的读者来说富有意义的名称。
http-equiv
http-equiv 属性为名称/值对提供了名称。并指示服务器在发送实际的文档之前先在要传送给浏览器的 MIME 文档头部包含名称/值对。
* content
content 属性提供了名称/值对中的值(name, http-equiv)。该值可以是任何有效的字符串。
content 属性始终要和 name 属性或 http-equiv 属性一起使用。
设定网页字符集
`<meta http-equiv="content-Type" content="text/html;charset=utf-8">`
`<meta charset="utf-8">`

* 关键字
`<meta name="keywords" content="your,keywords">`
* 响应式
`<meta name="viewport" content="width=device-width, initial-scale=1">`

:::tip
* viewport：能优化移动浏览器的显示。如果不是响应式网站，不要使用initial-scale或者禁用缩放。
* width：宽度（数值 / device-width）（范围从200 到10,000，默认为980 像素）
* height：高度（数值 / device-height）（范围从223 到10,000）
* initial-scale：初始的缩放比例 （范围从>0 到10）
* minimum-scale：允许用户缩放到的最小比例
* maximum-scale：允许用户缩放到的最大比例
* user-scalable：用户是否可以手动缩 (no,yes)
* minimal-ui**：可以在页面加载时最小化上下状态栏。（已弃用）
:::

:::danger 注意
很多人使用initial-scale=1到非响应式网站上，这会让网站以100%宽度渲染，
用户需要手动移动页面或者缩放。如果和initial-scale=1同时使用user-scalable=no或maximum-scale=1，
则用户将不能放大/缩小网页来看到全部的内容。 
:::

* 移动设备相关(中国)
```html
<meta name="HandheldFriendly" content="true">
<meta name="MobileOptimized" content="320">
<meta name="screen-orientation" content="portrait">
<meta name="x5-orientation" content="portrait">
<meta name="full-screen" content="yes">
<meta name="x5-fullscreen" content="true">
<meta name="browsermode" content="application">
<meta name="x5-page-mode" content="app">
Apple ios
<meta name="apple-itunes-app" content="app-id=APP_ID,affiliate-data=AFFILIATE_ID,app-argument=SOME_TEXT">
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="email=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="App Title">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="apple-touch-icon-precomposed" href="apple-touch-icon-precomposed.png">
Google android
<meta name="theme-color" content="#E64545">

<meta name="mobile-web-app-capable" content="yes">
```
* Apple ios
```html
<meta name="apple-itunes-app" content="app-id=APP_ID,affiliate-data=AFFILIATE_ID,app-argument=SOME_TEXT">
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="email=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="App Title">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="apple-touch-icon-precomposed" href="apple-touch-icon-precomposed.png">
```
* Google android
```
<meta name="theme-color" content="#E64545">

<meta name="mobile-web-app-capable" content="yes">
```