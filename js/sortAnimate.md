---
title: 冒泡排序动画
lang: zh-CN
---

闲着无聊突然~

模板与css搭建
```html
<template>
  <div class="container">
  </div>
</template>
<style>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container  .sort {
  height: 50px;
  width: 50px;
  border: 1px solid #ccc;
  transition: 1s;
  line-height: 50px;
  text-align: center;
  position: absolute;
}
</style>
```

```js
<script>
  init() {
    const arr = [5, 4, 8, 9, 6, 5, 4, 12, 3, 6, 7, 8, 56];
    const container = document.querySelector('.container');
    const fragment = document.createDocumentFragment();
    const len = arr.length;
    arr.forEach((val, index) => {
      const temp = document.createElement('div');
      temp.className = 'sort';
      temp.style.left = index * 60 + 'px';
      temp.id = index;
      temp.innerHTML = val;
      fragment.append(temp);
    });
    container.append(fragment);

    let time = 1; // 排序动画时间
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          setTimeout(() => {
            const x = document.getElementById(j);
            const y = document.getElementById(i);
            [x.style.left, y.style.left] = [y.style.left, x.style.left];
            [x.id, y.id] = [y.id, x.id];
          }, time * 1000);
          time++
        }
      }
    }
  }
  init()
</script>
```