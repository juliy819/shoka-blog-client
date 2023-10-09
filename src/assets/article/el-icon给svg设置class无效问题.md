---
title: el-icon给svg设置class无效问题
date: 2023-10-09 18:06
category: 前端
tags:
  - vue
  - 问题记录
---

## 问题

在使用`el-icon`内置图标时，如果单独使用`svg`，那么通过添加`class`设置`css`则无效果:

```vue
...
<close class="menu-icon" />
...

<style scoped>
  .menu-icon {
    width: 1em;
    height: 1em;
  }
</style>
```

可以看到，显示有类名`menu-icon`，却并未应用`css`属性

![image-20230322102018557](./assets/el-icon给svg设置class无效问题/image-20230322102018557.png)

## 解决方案

参考官方文档

![image-20230322102237258](./assets/el-icon给svg设置class无效问题/image-20230322102237258.png)

### 方案1

直接在标签内提供要设置的`style`属性

![image-20230322102516781](./assets/el-icon给svg设置class无效问题/image-20230322102516781.png)

### 方案2

也可以在外边包裹一层<el-icon>，通过给`el-icon`添加`class`来控制里面的`svg`图标

```
<el-icon class="menu-icon">
  <close />
</el-icon>
```



