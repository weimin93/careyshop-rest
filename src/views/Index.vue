<template>
  <div>
    <cs-card :title="$t('request')" class="request cs-card">
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

    <cs-card :title="$t('headers')" :expanded="false">
      <div>this is headers</div>
    </cs-card>

    <cs-card :title="$t('login')" :expanded="false" class="cs-card">
      <el-form :inline="true" :model="login">
        <el-form-item label="账号">
          <el-input v-model="login.username" placeholder="请输入账号" auto-complete="off" clearable>
            <i slot="prefix" class="el-input__icon el-icon-user"/>
          </el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="login.password" placeholder="请输入密码" auto-complete="off" show-password clearable>
            <i slot="prefix" class="el-input__icon el-icon-key"/>
          </el-input>
        </el-form-item>

        <el-form-item v-if="captcha.captcha" label="验证码">
          <el-input v-model="login.captcha" class="login-code" auto-complete="off" maxlength="4" clearable>
            <template slot="append">
              <img :src="captcha.url" class="cs-fcr" height="28px" @click="refreshCode" alt=""/>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-dropdown v-if="isLogin">
            <el-button type="primary">登录<i class="el-icon-arrow-down el-icon--right"/></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>管理组</el-dropdown-item>
              <el-dropdown-item>顾客组</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-button v-else type="primary">注销</el-button>
        </el-form-item>

        <el-form-item class="cs-fr">
          <span>当前身份：游客</span>
        </el-form-item>
      </el-form>
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
import { mapState } from 'vuex'
import { getAppCaptcha } from '@/api/app'
import util from '@/utils/util'

export default {
  name: 'Index',
  computed: {
    ...mapState('careyshop/setting', [
      'setting'
    ]),
    is_captcha() {
      const { apiBase, appKey } = this.setting
      return {
        apiBase,
        appKey
      }
    }
  },
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
      },
      // 是否需要验证码
      captcha: {
        captcha: false,
        session_id: '',
        url: ''
      },
      // 账号登录表单
      login: {
      }
    }
  },
  watch: {
    is_captcha: {
      handler() {
        this.setCaptcha()
      },
      immediate: true
    }
  },
  mounted() {
  },
  methods: {
    // 检测是否已登录
    isLogin() {
      const token = util.cookies.get('token')
      return !(!token || token === 'undefined')
    },
    // 设置是否启用验证码
    setCaptcha() {
      if (this.isLogin()) {
        return
      }

      const { apiBase, appKey } = this.is_captcha
      if (apiBase && appKey) {
        getAppCaptcha(appKey)
          .then(res => {
            if (res.data.captcha) {
              this.captcha.captcha = true
              this.captcha.sessionId = res.data.session_id
              this.refreshCode()
            }
          })
      } else {
        this.captcha.captcha = false
        this.captcha.sessionId = ''
      }
    },
    // 获取验证码
    refreshCode() {
      const { apiBase } = this.is_captcha
      if (!apiBase) {
        return
      }

      let url = util.settingReplace(apiBase, this.setting.variable)
      url += '/v1/app.html?'
      url += `method=image.app.captcha&session_id=${this.captcha.sessionId}&t=${Math.random()}`

      this.captcha.url = url
    }
  }
}
</script>

<style scoped lang="scss">
  .cs-card /deep/ .el-card__body {
    padding: 20px 20px 0 20px;
  }

  .request {
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
  }

  .login-code {
    /deep/ input {
      width: 100px;
    }

    /deep/ .el-input-group__append {
      padding: 0;
      background-color: #FFF;
    }
  }
</style>
