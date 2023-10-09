---
title: Vue深度选择器
date: 2023-10-09 18:08
category: 前端
tags:
  - vue
  - 知识
---

# Vue中的CSS深度选择器

## 概念与作用

当 `<style>` 标签有 `scoped` 属性时，它的 CSS 只作用于当前组件中的元素，父组件的样式将不会渗透到子组件。 如果你希望 scoped
样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用深度选择器。

一个简单的例子：

```html

<template>
  <div class="not-found">
    <a-card title="Card title">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </a-card>
  </div>
</template>
```

这是Vue项目中通常会看到的一个page文件，我在其中引用了ant-design-vue 的 a-card 组件，
我希望在这个page文件中，a-card组件的标题为绿色，于是我找到a-card组件title对应的class值，添加了如下样式代码：

```CSS
<
style lang

=
"scss"
scoped >
.ant-card-head-title {
    background: yellowgreen;
}

<
/
style >
```

显然，由于scoped属性的防渗透作用，我添加的背景色并不会生效。通常，会有两种处理方法：

1. 将scoped属性去掉。样式生效了，但是这种写法是作用到全局的，如果不严格规范class的命名，非常容易污染全局样式。这种写法，其实等同于写在全局样式文件中。

2. 保留scoped属性，使用深度选择器，代码如下

   <style lang="scss" scoped>
     :deep(.ant-card-head-title){
       background: yellowgreen;
     }
   </style>

查看浏览器，以上代码被编译成

```CSS
[data-v-e44d851a] .ant-card-head-title {
    background: yellowgreen;
}
```

很明显，添加了这个属性之后，可以达到我们想要的效果，而且不会污染全局样式

## 写法

```CSS
<!--
写法1 使用::v-deep

-->
<
style lang

=
"scss"
scoped >
::v-deep .ant-card-head-title {
    background: yellowgreen;
}

<
/
style >

<!--
写法2 使用 >>> 操作符-- >

<
style scoped >
>>> .ant-card-head-title {
    background: yellowgreen;
}

<
/
style >

<!--
写法3 使用 /deep/

-->
<
style scoped >
/deep/ .ant-card-head-title {
    background: yellowgreen;
}

<
/
style >

<!--
写法4 使用:deep(<inner-selector>)

-->
<
style lang

=
"scss"
scoped >
:deep(.ant-card-head-title) {
    background: yellowgreen;
}

<
/
style >
```

写法1 和写法4，都支持sass预处理器。但是在新的vue3.0 单文件规范中，如果你还是使用写法1，会碰到如下警告:

> **\[@vue/compiler-sfc\] `::v-deep` usage as a combinator has been deprecated. Use `:deep(<inner-selector>)` instead.**

写法1在vue3.0中已经被弃用了，以后小伙伴们在开发vue3.0项目的时候，还是使用写法4吧～，有一说一，写法4在语义上也更有助于理解。

关于写法1和写法3，主要是不支持sass预处理器的解析，且`>>>`操作符存在浏览器兼容性问题，所以朋友们还是谨慎使用吧～