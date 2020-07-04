<template>
  <div>
    <cs-card :title="$t('request')">
      <el-form ref="request" :model="request" label-width="90px">
        <el-form-item :label="$t('url')">
          <el-input
            v-model="request.url"
            :placeholder="`https://{{host}}/api/v1/goods`"
            class="request-url"
            clearable>
            <template slot="prepend">
              <el-button :title="$t('add favorites')" :disabled="!request.url" icon="el-icon-star-on" size="mini"/>
              <el-button :title="$t('get docs')" :disabled="!request.url" icon="el-icon-s-help" size="mini"/>
              <el-button :title="$t('get url')" icon="el-icon-menu" size="mini"/>
            </template>

            <el-select v-model="request.method" slot="append">
              <el-option v-for="method in methodMap" :key="method.key" :label="method.value" :value="method.key"/>
            </el-select>
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('payload')">
          <el-input v-model="request.payload" placeholder="application/json" type="textarea" :rows="10"></el-input>
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
      <el-button type="primary" :disabled="!request.url">{{$t('send request')}}</el-button>
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
      methodMap: [
        { key: 'get', value: 'GET' },
        { key: 'post', value: 'POST' },
        { key: 'put', value: 'PUT' },
        { key: 'patch', value: 'PATCH' },
        { key: 'delete', value: 'DELETE' },
        { key: 'head', value: 'HEAD' },
        { key: 'options', value: 'OPTIONS' }
      ],
      // 请求表单
      request: {
        url: '',
        payload: '',
        method: 'get'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .request-url {
    /deep/ .el-select .el-input {
      width: 130px;
    }

    /deep/ .is-disabled {
      border-color: #FFF;
    }

    /deep/ .el-input-group__append {
      background-color: #FFF;
    }

    /deep/ .el-input-group__prepend {
      background-color: #FFF;
    }
  }
</style>
