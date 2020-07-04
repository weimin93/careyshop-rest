<template>
  <div>
    <cs-card title="请求">
      <el-form ref="request" :model="request" label-width="90px">
        <el-form-item label="地址">
          <el-input v-model="request.url"></el-input>
        </el-form-item>

        <el-form-item label="参数">
          <el-input v-model="request.url"></el-input>
        </el-form-item>
      </el-form>
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
  },
  data() {
    return {
      // 请求表单
      request: {}
    }
  }
}
</script>

<style scoped>
</style>
