<template>
  <div>
    <cs-card title="请求">
      <div>this is url</div>
    </cs-card>

    <cs-card title="请求头" :expanded="true">
      <div>this is headers</div>
    </cs-card>

    <cs-card title="登陆" :expanded="true">
      <div>this is authentication</div>
    </cs-card>

    <div class="cs-mb cs-tr">
      <el-button type="primary">发送请求</el-button>
    </div>

    <cs-card title="响应">
      <div>this is response</div>
    </cs-card>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
    csCard: () => import('@/components/cs-card')
  }
}
</script>

<style scoped>
</style>
