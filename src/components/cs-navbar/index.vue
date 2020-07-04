<template>
  <div class="header">
    <div flex-box="0" class="header-logo cs-pl-10">
      <a href="/"><img src="~@/assets/images/logo@2x.png" height="60" alt="logo"></a>
      <span class="cs-pl">Restful API {{$t('_title')}} <span style="font-size: 12px;">v{{$version}}</span></span>
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
      <el-menu-item index="/index">{{$t('home')}}</el-menu-item>
      <el-submenu index="favorites">
        <template slot="title">{{$t('favorites')}}</template>
        <el-menu-item index="/favorites">{{$t('manage favorites')}}</el-menu-item>
        <el-menu-item>{{$t('save current request')}}</el-menu-item>
        <el-menu-item>{{$t('import favorites')}}</el-menu-item>
        <el-menu-item>{{$t('export favorites')}}</el-menu-item>
      </el-submenu>
      <el-menu-item index="/history">{{$t('history')}}</el-menu-item>
      <el-menu-item index="/help">{{$t('help')}}</el-menu-item>
      <el-menu-item @click="openSetting">{{$t('setting')}}</el-menu-item>
      <el-submenu index="languages">
        <template slot="title">{{$t('languages')}}</template>
        <el-menu-item
          v-for="language in $languages"
          :key="language.value"
          @click="setLanguage(language.value)">{{language.label}}</el-menu-item>
      </el-submenu>
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
    },
    setLanguage(value) {
      this.$i18n.locale = value
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
