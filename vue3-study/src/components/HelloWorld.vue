<template>
  <div class="hello">
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="sayHello">输出信息</button>
  </div>
</template>

<script>
export default {
  setup() {
    let name = "胡桃";
    let age = 23;

    function sayHello() {
      console.log(`你好，我是${name}，今年${age}岁！`);
    }

    return {
      name,
      age,
      sayHello,
    };
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
