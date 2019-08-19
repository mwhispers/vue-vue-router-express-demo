<template>
  <div id="app">
    <mu-appbar style="width:100%" color="primary" :title="title" :zDepth="zDepth"></mu-appbar>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "电影列表",
      zDepth: 2
    };
  }
};
</script>
<style scoped lang="less">
#app {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

