<template>
  <div>
    <div flex-box="0" class="header-logo cs-pl-10">
      <img src="~@/assets/image/logo@2x.png" height="100%" alt="logo">
    </div>
    <el-menu
      flex-box="1"
      class="header-menu"
      :default-active="$route.fullPath"
      mode="horizontal"
      background-color="#2C3643"
      text-color="#CCCCCC"
      active-text-color="#FFD04B"
      :router="true">
      <el-menu-item index="/index">首页</el-menu-item>
      <el-menu-item index="/favorites">收藏夹</el-menu-item>
      <el-menu-item index="/history">历史记录</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'cs-navbar'
}
</script>

<style scoped>
  .header-logo {
    float: left;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #2C3643;
  }

  .header-menu {
    display: flex;
    justify-content: flex-end;
  }
</style>
