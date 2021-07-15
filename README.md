# Vue3

## Vue3简介
+ 2020年9月18日，Vue.js发布3.0版本，代号：One Price（海贼王）
+ 耗时2年多、2600+次提交、30+个RFC、600+次PR、99位贡献者
+ github的tag地址：https://github.com/vuejs/vue-next/releases/tag/v3.0.0

## Vue3带来了什么？

### 1.性能的提升
+ 打包大小减少41%
+ 初次渲染快55%，更新渲染快133%
+ 内存减少54%
  ......
  
### 2.源码的升级
+ 使用Proxy代替defineProperty实现响应式
+ 重写虚拟DOM的实现和Tree-Shaking
  ......
  
### 3.拥抱TypeScript
+ Vue3可以更好的支持TypeScript

### 4.新的特性
1.Composition API(组合API)
+ setup配置
+ ref与reactive
+ watch与watchEffect
+ provide与inject
  ......
  
2.新的内置组件
+ Fragment
+ Teleport
+ Suspense

3.其它改变
+ 新的生命周期钩子
+ data选项应始终被声明为一个函数
+ 移除keyCode支持作为v-on的修饰符
  ......
  
## 常用Composition API

### 1.拉开序幕的setup

### 2.ref函数

