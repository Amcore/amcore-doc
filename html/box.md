---
title: 盒子模型
lang: zh-CN
---

### 盒子模型
content、margin、padding、border;
（IE盒模型和标准盒模型的区别）———IE盒模型的content包括border、padding

根据盒子模型可以做一些有意思的事情，例如

#### 盒子模型画三角形
```html
<body class="container">
  <div class="div-angles"></div>
  <div class="div-angles right"></div>
  <div class="div-angles bottom"></div>
  <div class="div-angles left"></div>

  <style>
    html,body {
      height:100%;
    }
    .container {
      display: box;
      display: -webkit-box;
      display: flex;
      display: -webkit-flex;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
    .div-angles {
      width: 0;
      height: 0;
      border-style: solid;
      border-width:30px;
      width:0px;
      height:0px;
      border-color: transparent transparent #06c transparent;
    }
    .right {
      border-color: transparent transparent transparent #06c ;
    }
    .bottom {
      border-color: #06c transparent transparent ;
    }
    .left {
      border-color: transparent #06c transparent transparent;
    }
  </style>

</body>
```