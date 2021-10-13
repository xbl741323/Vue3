## Vue3简介
+ 2020年9月18日，Vue.js发布3.0版本，代号：One Price（海贼王）
+ 耗时2年多、2600+次提交、30+个RFC、600+次PR、99位贡献者
+ github的tag地址：https://github.com/vuejs/vue-next/releases/tag/v3.0.0

## 一、Vue3带来了什么？

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
  
## 二、常用Composition API

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
  2. setup不能是一个async函数，因为返回值不再是return的对象，而是promise，模板看不到return对象中的属性(后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合)
 
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
+ 作用：定义一个对象（或数组）类型的响应式数据（基本类型别用它，用ref函数）
+ 语法：`const 代理对象 = reactive(被代理对象)`接收一个对象(或数组)，返回一个代理对象（proxy对象）
+ reactive定义的响应式数据是"深层次的"
+ 内部基于ES6的Proxy实现，通过代理对象操作源对象内部数据都是响应式的

### 4.Vue2.0中的响应式原理
+ 对象类型：通过`Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）
+ 数组类型：通过重写更新数组的一系列方法来实现拦截（对数组的变更方法进行了包裹）
```
Object.defineProperty(data,'count',{
     get(){}
     set(){}
})
```
存在问题：
+ 新增属性、删除属性，界面不会更新
+ 直接通过下标修改数组，界面不会自动更新

### 5.Vue3.0中的响应式原理
+ 通过Proxy（代理）：拦截对象中任意属性的变化，包括：属性值的读写、属性的添加、属性的删除等
+ 通过Reflect（反射）：对被代理对象的属性进行操作

### 6.reactive对比ref
+ 从定义数据角度对比：
1. ref用来定义：基本数据类型
2. reactive用来定义：对象（或数组）类型数据
3. 备注：ref也可以用来定义对象（或数组）类型数据，它内部会自动通过reactive转化为代理对象

+ 从原理角度对比：
1. ref通过`Object.defineProperty()`的get与set来实现响应式（数据劫持）
2. reactive通过Proxy来实现响应式（数据劫持），并通过Reflect操作源对象内部的数据

+ 从使用角度对比：
1. ref定义的数据：操作数据需要`.value`，读取数据时模板中直接读取不需要`.value`
2. reactive定义的数据：操作数据与读取数据：均不需要`.value`


### 7.setup的两个注意点
+ setup执行的时机：
在beforeCreate之前执行一次，this是undefined

+ setup的参数：
1. props：值为对象，包含组件外部传递过来，且组件内部声明接收了的属性
2. context：上下文对象 
     + attrs：值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性，相当于`this.$attrs`
     + slots：收到的插槽内容，相当于`this.$slots`
     + emit：分发自定义事件的函数，相当于`this.$emit`

### 8.计算属性与监视
1. computed函数
+ 与Vue2.x中computed配置功能一致
+ 写法：
```
<script>
import { computed } from "vue";
export default {
  props: ["title"],
  setup(props) {
    // vue3.0中的计算属性用法-简写（没有考虑计算属性被修改的情况）
    let showTitle = computed(() => { 
      return "o" + props.title + "o";
    });
    
    // vue3.0中的计算属性用法-完整写法
    let showName = computed({
      get() {
        return name.value;
      },
      set(value) {
        name.value = value;
      },
    });
    
    return { showTitle };
  },
};
</script>
```

2.watch函数
+ 与Vue2.x中watch配置功能一致
+ 两个小坑：
   1. 监视reactive定义的响应式数据时：oldValue无法正确获取，强制开启了深度监视（deep配置失效）。
   2. 监视reactive定义的响应式数据中的某个对象属性时：deep配置有效。
+ 写法：
```
<script>
import { ref,reactive,watch } from 'vue'
export default {
  setup() {
    let num = ref(0)
    let msg = ref('hello')
    let person = reactive({
      name:"神里",
      age:18，
      job:{
        salary:2000
      }
    })
    
    // 情况1：监视ref所定义的一个响应式数据
    watch(num,(newVlue,oldValue)=>{ 
      console.log(oldValue,"输出oldValue")
      console.log(newVlue,"输出newVlue")
    })
    
    // 情况2：监视ref所定义的多个响应式数据，immediate：true 初始化加载时执行监听
    watch([num,msg],(newVlue,oldValue)=>{ 
      console.log(oldValue,"输出oldValue")
      console.log(newVlue,"输出newVlue")
    },{immediate:true})
    
    /*
      情况3：监视reactive所定义的一个响应式对象数据的全部属性
      注意1：此处无法正确获取oldValue
      注意2：强制开启了深度监听（目前关不掉）
    */
    watch(person,(newVlue,oldValue)=>{ 
      console.log(oldValue,"输出oldValue")
      console.log(newVlue,"输出newVlue")
    },
    { immediate: true }
   );
    
    // 情况4：监视reactive所定义的一个响应式对象数据中的某个属性
    watch(
      () => person.age,
      (newVlue, oldValue) => {
        console.log(oldValue, "输出oldValue");
        console.log(newVlue, "输出newVlue");
      },
      { immediate: true }
    );
    
    // 情况5：监视reactive所定义的一个响应式对象数据中的某些属性
    watch(
      [() => person.age, () => person.name],
      (newVlue, oldValue) => {
        console.log(oldValue, "输出oldValue");
        console.log(newVlue, "输出newVlue");
      },
      { immediate: true }
    );
    
    // 特殊情况：监视reactive所定义的一个响应式对象数据中的对象属性（注意：此处deep: true需要添加，负责无响应）
    watch(
      () => person.job,
      (newVlue, oldValue) => {
        console.log(oldValue, "输出oldValue");
        console.log(newVlue, "输出newVlue");
      },
      { immediate: true, deep: true }
    );

    
    function changeNum(){
       num.value += 1
    }
   
    return {
      num,
      msg,
      person,
      changeNum
    };
  },
};
</script>
```

3.watchEffect函数
+ watch的套路是：既要指明监视的属性，也要指明监视的回调。
+ watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。
+ watchEffect有点像computed：
  1. 但computed注重的计算出来的值（回调函数的返回值）,所以必须要写返回值。
  2. 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。
```
// watchEffect所指定的回调中用到的数据只要发生变化，就重新执行回调
watchEffect(() => {
     console.log(num.value)
     console.log(person.age)
     console.log("调用了watchEffect");
  });
```

### 9.生命周期
#### Vue2.x生命周期图：
![image](https://user-images.githubusercontent.com/49593119/136749133-ec5d4f7c-15aa-4bf8-bc42-bd8dbbfaadba.png)

#### Vue3.0生命周期图：
![image](https://user-images.githubusercontent.com/49593119/136749592-9f833ff8-faa0-4f52-8e01-e257481d9096.png)

+ Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有两个被更名：
1. beforeDestroy 改名为 beforeUnmount
2. destroyed 改名为 unmounted

+ Vue3.0中也提供了Composition API形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
1. beforeCreate ==> setup()
2. created ==> setup()
3. beforeMount ==> onBeforeMount
4. mounted ==> onMounted
5. beforeUpdate ==> onBeforeUpdate
6. updated ==> onUpdated
7. beforeUnmount ==> onBeforeUnmount
8. unmounted ==> onUnmounted

### 10.自定义hook函数
+ 什么是hook?--本质是一个函数，把setup函数中使用的Compositon API进行了封装
+ 类似于Vue2.x中的mixin
+ 自定义hook的优势：复用代码，让setup中的逻辑更清楚易懂

### 11.toRef与toRefs
+ 作用：创建一个ref对象，其value值指向另一个对象中的某个属性值
+ 语法：`const name = toRef(person,'name')`
+ 应用：要将响应式对象中的某个属性单独提供给外部使用时
+ 扩展：toRefs与toRef功能一致，但可以批量创建多个ref对象，语法:toRefs(person)

## 三、其它Composition API
### 1.shallowReactive与shallowRef
+ shallowReactive：只处理对象最外层属性的响应式（浅响应式）
+ shallowRef：只处理基本数据类型的响应式，不进行对象的响应式处理
+ 什么时候使用？
  1. 如果有一个对象数据，结构比较深，但变化时只是外层属性变化 ==> shallowReactive
  2. 如果有一个对象，后续功能不会修改该对象中的属性，而是生成新的对象来替换 ==> shallowRef
  
### 2.readonly与shallowReadonly
+ readonly：让一个响应式数据变为只读的（深只读）
+ shallowReadonly：让一个响应式数据变为只读的（浅只读，reactive创建的对象数据第一层不能改）
+ 应用场景：不希望数据被修改时

### 3.toRaw与markRaw
+ toRow：
  1. 作用：将一个由reactive生成的对象转为普通对象
  2. 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新
+ markRaw：
  1. 作用：标记一个对象，使其永远不会再成为响应式对象
  2. 应用场景：
    ```
    (1)：有些值不应被设置为响应式的，例如复杂的第三方类库等
    (2)：当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能

    ```
### 4.customRef
+ 作用：创建一个自定义的ref，并对其依赖项跟踪和更新触发进行显式控制
+ 实现防抖效果：
 ```
 <template>
  <div class="home_index">
    <input type="text" v-model="msg" />
    <div>{{ msg }}</div>
  </div>
</template>

<script>
import { customRef } from "vue";
export default {
  setup() {
    let msg = myRef("hello", 500);
    function myRef(value, delay) {
      let timer;
      return customRef((track, trigger) => {
        return {
          get() {
            track();
            return value;
          },
          set(newValue) {
            value = newValue;
            clearTimeout(timer); // 清除已有定时器
            timer = setTimeout(() => {
              trigger();
            }, delay);
          },
        };
      });
    }
    return {
      msg,
    };
  },
};
 ```
 
### 5.响应式数据的判断
+ isRef：检查一个值是为一个ref对象
+ isReactive：检查一个对象是否是由reactive创建的响应式代理
+ isReadonly：检查一个对象是否是由readonly创建的只读代理
+ isProxy：检查一个对象是否是由reactive或者readonly方法创建的代理

## 四、Composition API的优势
+ 1.Options API存在的问题：使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data,methods,computed里修改
![image](https://user-images.githubusercontent.com/49593119/136882102-bff12326-6463-4e61-9e15-155767acc945.png)

+ 2.Composition API的优势：我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起
![image](https://user-images.githubusercontent.com/49593119/136882432-80f615f8-711f-4a6e-8136-c68cae1af1e6.png)

## 五、新的组件
### 1.Fragment
+ 在Vue2中：组件必须有一个根标签
+ 在Vue3中：组件可以没有根标签，内部会将多个标签包含在一个Fragment虚拟元素中
+ 好处：减少标签层级，减小内存占用

### 2.Teleport
+ 什么是Teleport？=>Teleport是一种能够将我们的组件html结构移动到指定位置的技术
```
 <teleport>
   <div v-if="isShow" class="mask">
     <div class="dialog">
       <h3>我是一个弹框</h3>
       <button @click="isShow = false">关闭弹窗</button>
     </div>
   <div>
 <teleport>
```

### 3.Suspense
+ 等待异步组件时渲染一些额外的内容，让应用有更好的用户体验
+ 使用步骤：
```
// 1.异步引入组件
import { defineAsyncComponent } from 'vue'
const Child = defineAsyncComponent(()=>import('./component/Child.vue'))
```
```
// 2.使用Supense包裹组件，并配置好default与fallback
<template>
  <div>
    <h3>我是App组件</h3>
    <Suspense>
      <template v-slot:default>
         <Child />
      </template>
      <template v-slot:fallback>
         <h3>加载中.....</h3>
      </template>
    </Supense>
  <div>
</template>
```

