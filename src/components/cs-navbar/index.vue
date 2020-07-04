<template>
  <div class="header">
    <div flex-box="0" class="header-logo cs-pl-10">
      <a href="/"><img src="~@/assets/image/logo@2x.png" height="60" alt="logo"></a>
      <span class="cs-pl">Restful API 接口调试 <span style="font-size: 12px;">v{{$version}}</span></span>
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
      <el-submenu index="/favorites">
        <template slot="title">收藏夹</template>
        <el-menu-item index="/favorites">收藏夹</el-menu-item>
        <el-menu-item>导出数据</el-menu-item>
        <el-menu-item>导入数据</el-menu-item>
      </el-submenu>
      <el-menu-item index="/history">历史记录</el-menu-item>
      <el-menu-item index="/help">帮助</el-menu-item>
      <el-menu-item @click="openSetting">设置</el-menu-item>
    </el-menu>

    <cs-setting ref="setting"></cs-setting>
  </div>
</template>

<script>
export default {
  name: 'cs-navbar',
  methods: {
    openSetting() {
      this.$nextTick(() => {
        this.$refs.setting.dialog = true
      })
    }
  }
}
</script>

<style scoped>
  .header {
    border-radius: 0 0 4px 4px;
    overflow: hidden;
  }

  .header-logo {
    float: left;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    background: #2C3643;
  }

  .header-menu {
    display: flex;
    justify-content: flex-end;
  }
</style>
