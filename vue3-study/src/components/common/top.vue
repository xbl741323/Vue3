<template>
  <div class="top">
    <!-- <i class="el-icon-arrow-left com-top-sty-left"></i> -->
    <span>{{ showTitle }}</span>
    <!-- <i class="el-icon-search com-top-sty-right"></i> -->
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  props: ["title"],
  setup(props) {
    let name = ref("小明");
    // 计算属性-简写（没有考虑计算属性被修改的情况）
    let showTitle = computed(() => {
      return "o" + props.title + "o";
    });

    // 计算属性-完整写法
    let showName = computed({
      get() {
        return name.value;
      },
      set(value) {
        name.value = value;
      },
    });

    return { showTitle, showName };
  },
};
</script>

<style scoped>
.top {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #f4f6f8;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.com-top-sty-left {
  font-size: 20px;
  margin-left: 10px;
}
.com-top-sty-right {
  font-size: 20px;
  margin-right: 15px;
}
</style>