<template>
  <el-container class="container">
    <el-header>
      <cs-navbar/>
    </el-header>

    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import CsNavbar from '@/components/cs-navbar'

export default {
  name: 'Layout',
  components: {
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
