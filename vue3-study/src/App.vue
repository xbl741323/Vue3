<template>
  <top :title="title" />
  <router-view />
  <tab-bar @change-title='changeTitle' />
</template>

<script>
import { ref } from "vue";
import tabBar from "./components/common/tabBar";
import top from "./components/common/top";
export default {
  components: {
    tabBar,
    top,
  },
  setup(){
    let title = ref('首页');
    function changeTitle(val){
        title.value = val
    }
    return{
      changeTitle,
      title
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 45px;
}
</style>
