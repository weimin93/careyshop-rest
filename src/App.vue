<template>
  <div id="app">
    <el-container>
      <el-header>
        <div flex-box="0" class="header-logo cs-pl-10">
          <img src="~@/assets/image/logo@2x.png" height="100%" alt="logo">
        </div>
        <el-menu
          flex-box="1"
          class="menu-header"
          default-active="Home"
          mode="horizontal"
          background-color="#2C3643"
          text-color="#CCCCCC"
          active-text-color="#FFD04B">
          <el-menu-item index="Home">首页</el-menu-item>
          <el-menu-item index="Favorites">收藏夹</el-menu-item>
          <el-menu-item index="History">历史记录</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import '~@/assets/style/public-class.scss';

  .header-logo {
    float: left;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #2C3643;
  }

  .menu-header {
    display: flex;
    justify-content: flex-end;
  }
</style>
