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

+ 理解：Vue3.0中一个新的配置项，值为一个函数
+ setup是所有Compositoin API(组合API) "表演的舞台"
+ 组件中所用到的：数据、方法等等，均要配置在setup中
+ setup函数的两种返回值：
  1. 若返回一个对象，则对象中的属性、方法，在模板中均可以直接使用（重点关注！）
  2. 若返回一个渲染函数：则可以自定义渲染内容（了解）
+ 注意点：
  1. 尽量不要与Vue2.x配置混合使用
  ```
  (1).Vue2.x配置(data、methods、computed...)中可以直接访问到setup中的属性方法
  (2).但在setup中不能访问到Vue2.x配置(data、methods、computed...)
  (3).如果有重名，setup优先
  ```
  2. setup不能是一个async函数，因为返回值不再是return的对象，而是promise，模板看不到return对象中的属性
 
### 2.ref函数

+ 作用：定义一个响应式的数据
+ 语法：`const xxx = ref(initValue)`
  1. 创建一个包含响应式数据的引用对象(reference对象，简称ref对象)
  2. JS中操作数据：xxx.value
  3. 模板中读取数据：不需要.value，直接`<div>{{xxx}}</div>`
+ 备注：
  1. 接收的数据可以是：基本类型、也可以是对象类型
  2. 基本类型的数据：响应式依然是靠Object.defineProperty()的get与set完成的
  3. 对象类型的数据：内部"求助了"Vue3.0中的一个新函数--reactive函数

### 3.reactive函数
+ 作用：定义一个对象类型的响应式数据（基本类型别用它，用ref函数）
+ 语法：`const 代理对象 = reactive(被代理对象)`接收一个对象(或数组)，返回一个代理对象（proxy对象）
+ reactive定义的响应式数据是"深层次的"
+ 内部基于ES6的Proxy实现，通过代理对象操作源对象内部数据都是响应式的

### 4.Vue2.0中的响应式原理
+ 对象类型：通过`Object.defineProperty()对属性的读取、修改进行拦截（数据劫持）`
+ 数组类型：通过重写更新数组的一系列方法来实现拦截（对数组的变更方法进行了包裹）
`
Object.defineProperty(data,'count',{
     get(){}
     set(){}
})
`
存在问题：
+ 新增属性、删除属性，界面不会更新
+ 直接通过下标修改数组，界面不会自动更新

### 5.Vue3.0中的响应式原理
+ 通过Proxy（代理）：拦截对象中任意属性的变化，包括：属性值的读写、属性的添加、属性的删除等
+ 通过Reflect（反射）：对被代理对象的属性进行操作

