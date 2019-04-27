---
title: Array的侦测方式
lang: zh-CN
---

Object的变化是靠setter来追踪的，只要一个数据变化后一定会触发setter。
而数组使用类似拦截器的东西追踪数组中的变化。