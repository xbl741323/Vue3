<template>
  <div class="tab_bar">
    <div
      class="tab_bar_item"
      v-for="(item, index) in tabInfo"
      :key="index"
      @click="changeBar(item, index)">
      <img :src="currentIndex == index ? item.activeUrl : item.url" alt="" />
      <span
        v-if="index !== 2"
        :class="[currentIndex == index ? 'active_color' : '']">{{ item.title }}</span>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
export default {
  setup(props,context) {
    const router = useRouter();
    let currentIndex = ref(0);
    let tabInfo = reactive([
      {
        url: require("../../assets/images/shouye.png"),
        activeUrl: require("../../assets/images/shouye_active.png"),
        path: "/",
        title: "首页",
      },
      {
        url: require("../../assets/images/zhengce.png"),
        activeUrl: require("../../assets/images/zhengce_active.png"),
        path: "/policy",
        title: "政策",
      },
      {
        url: require("../../assets/images/new_zixun.png"),
      },
      {
        url: require("../../assets/images/fenglei.png"),
        activeUrl: require("../../assets/images/fenglei_active.png"),
        path: "/service",
        title: "分类",
      },
      {
        url: require("../../assets/images/wode.png"),
        activeUrl: require("../../assets/images/wode_active.png"),
        path: "/my",
        title: "我的",
      },
    ]);

    function changeBar(val, index) {
      if (index !== 2) {
        currentIndex.value = index;
        router.push(val.path);
        context.emit('change-title',val.title)
      }
    }
    return {
      currentIndex,
      tabInfo,
      changeBar,
    };
  },
};
</script>

<style scoped>
.tab_bar {
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  border-top: 1px solid #e7e6eb;
}
.tab_bar > .tab_bar_item:nth-of-type(3) img {
  width: 50px;
  height: 50px;
}
.tab_bar_item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #999999;
}
.tab_bar_item img {
  width: 24px;
  height: 24px;
  margin-bottom: 3px;
}
.active_color {
  color: #36a6fe;
}
</style>