<template>
  <div>
    <cs-card :title="$t('request')">
      <el-form ref="request" :model="request" label-width="90px">
        <el-form-item :label="$t('url')">
          <el-input v-model="request.url"></el-input>
        </el-form-item>

        <el-form-item :label="$t('payload')">
          <el-input v-model="request.payload"></el-input>
        </el-form-item>
      </el-form>
    </cs-card>

    <cs-card :title="$t('headers')" :expanded="true">
      <div>this is headers</div>
    </cs-card>

    <cs-card :title="$t('login')" :expanded="true">
      <div>this is log in</div>
    </cs-card>

    <div class="cs-mb cs-tr">
      <el-button type="primary">{{$t('send request')}}</el-button>
    </div>

    <cs-card :title="$t('response')">
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
