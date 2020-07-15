<template>
  <div class="header">
    <div flex-box="0" class="header-logo cs-pl-10">
      <a href="/"><img src="~@/assets/image/logo@2x.png" height="60" alt="logo"></a>
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
        <el-menu-item @click="importFav">{{$t('import favorites')}}</el-menu-item>
        <el-menu-item @click="exportFav">{{$t('export favorites')}}</el-menu-item>
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
    <input type="file" ref="refFile" style="display: none" v-on:change="fileLoad" accept=".json">
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'cs-navbar',
  methods: {
    ...mapActions('careyshop/favorites', [
      'importFavorites',
      'exportFavorites'
    ]),
    openSetting() {
      this.$nextTick(() => {
        this.$refs.setting.dialog = true
      })
    },
    setLanguage(value) {
      this.$i18n.locale = value
    },
    fileLoad() {
      const selectedFile = this.$refs.refFile.files[0]
      if (!selectedFile) {
        return
      }

      let reader = new FileReader()
      reader.readAsText(selectedFile)
      reader.onload = async({ target }) => {
        await this.importFavorites(target.result)
        this.$refs.refFile.value = ''
        this.$message.success(this.$t('favorite success'))
      }
    },
    importFav() {
      this.$refs.refFile.dispatchEvent(new MouseEvent('click'))
    },
    exportFav() {
      this.exportFavorites()
        .then(res => {
          const element = document.createElement('a')
          element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(res))
          element.setAttribute('download', 'favorites')
          element.style.display = 'none'
          element.click()
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
