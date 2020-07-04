<template>
  <el-container class="container">
    <el-header>
      <cs-navbar/>
    </el-header>

    <el-main>
      <router-view/>
    </el-main>

    <el-footer>
      <cs-footer/>
    </el-footer>
  </el-container>
</template>

<script>
import CsNavbar from '@/components/cs-navbar'
import CsFooter from '@/components/cs-footer'

export default {
  name: 'Layout',
  components: {
    CsFooter,
    CsNavbar
  }
}
</script>

<style scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
