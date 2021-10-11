<template>
  <div class="home_index">
    <div>num：{{ num }}</div>
    <el-button @click="changeNum">点我加1</el-button>
    <br />
    <div>msg：{{ msg }}</div>
    <el-button @click="msg += '!'">点我加1</el-button>
    <br />
    <div>姓名：{{ person.name }}</div>
    <div>年龄：{{ person.age }}</div>
    <el-button @click="person.name += '!'">改名</el-button>
    <el-button @click="person.age += 1">改年龄</el-button>
  </div>
</template>

<script>
import { ref, reactive, watch, watchEffect } from "vue";
export default {
  setup() {
    let num = ref(0);
    let msg = ref("hello");
    let person = reactive({
      name: "神里",
      age: 18,
    });

    watchEffect(() => {
      console.log(num.value)
      console.log(person.age)
      console.log("调用了watchEffect");
    });

    function changeNum() {
      num.value += 1;
    }

    return {
      num,
      msg,
      person,
      changeNum,
    };
  },
};
</script>
<style scoped>
.home_index div {
  margin-bottom: 10px;
}
</style>