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
              <cs-menu @confirm="confirmMenu"/>
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

    <cs-card :title="getLoginInfo()" :expanded="true" class="cs-card">
      <el-form :inline="true" :model="login">
        <el-form-item :label="$t('username')">
          <el-input v-model="login.username" :placeholder="$t('username enter')" auto-complete="off" :disabled="is_login" clearable>
            <i slot="prefix" class="el-input__icon el-icon-user"/>
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('password')">
          <el-input v-model="login.password" :placeholder="$t('password enter')" auto-complete="off" :disabled="is_login" show-password clearable>
            <i slot="prefix" class="el-input__icon el-icon-key"/>
          </el-input>
        </el-form-item>

        <el-form-item v-if="captcha.captcha" :label="$t('captcha')">
          <el-input v-model="login.login_code" class="login-code" auto-complete="off" maxlength="4" clearable>
            <template slot="append">
              <img :src="captcha.url" class="cs-fcr" height="28px" @click="refreshCode" alt=""/>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-dropdown v-if="!is_login" @command="loginCommand">
            <el-button type="primary" :loading="login.loading">{{$t('login')}}<i class="el-icon-arrow-down el-icon--right"/></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="admin">{{$t('admin group')}}</el-dropdown-item>
              <el-dropdown-item command="user">{{$t('client group')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-button v-else type="success" :loading="login.loading" @click="logoutUser">{{$t('logout')}}</el-button>
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
import util from '@/utils/util'
import { getAppCaptcha } from '@/api/app'
import { loginAdminUser, logoutAdminUser } from '@/api/admin'
import { loginClientUser, logoutClientUser } from '@/api/client'

export default {
  name: 'Index',
  computed: {
    ...mapState('careyshop/setting', [
      'setting'
    ])
  },
  components: {
    csCard: () => import('@/components/cs-card'),
    csMenu: () => import('@/components/cs-menu')
  },
  data() {
    return {
      is_login: false,
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
        url: ''
      },
      // 账号登录表单
      login: {
        mode: '',
        loading: false,
        username: '',
        password: '',
        login_code: '',
        session_id: ''
      }
    }
  },
  mounted() {
    this.setLoginInfo()
    this.setCaptcha()
  },
  methods: {
    // 设置是否启用验证码
    setCaptcha() {
      if (this.is_login) {
        return
      }

      const { apiBase, appKey } = this.setting
      if (apiBase && appKey) {
        getAppCaptcha(appKey)
          .then(res => {
            if (res.data.captcha) {
              this.captcha.captcha = true
              this.login.session_id = res.data.session_id
              this.refreshCode()
            }
          })
      } else {
        this.captcha.captcha = false
        this.captcha.session_id = ''
      }
    },
    // 刷新验证码
    refreshCode() {
      if (!this.setting.apiBase) {
        return
      }

      let url = util.settingReplace(this.setting.apiBase, this.setting.variable)
      url += '/v1/app.html?'
      url += `method=image.app.captcha&session_id=${this.login.session_id}&t=${Math.random()}`

      this.captcha.url = url
      this.login.login_code = ''
    },
    // 账号登录
    loginCommand(command) {
      this.login.loading = true
      const login = command === 'admin' ? loginAdminUser : loginClientUser

      login({
        ...this.login,
        appkey: this.setting.appKey
      })
        .then(res => {
          this.is_login = true
          this.login.mode = command
          this.login.password = ''
          this.captcha.captcha = false

          const cookieSetting = { expires: 365 }
          util.cookies.set('mode', command, cookieSetting)
          util.cookies.set('name', res.data[command].username, cookieSetting)
          util.cookies.set('token', res.data.token.token, cookieSetting)
        })
        .catch(() => {
          this.refreshCode()
        })
        .finally(() => {
          this.login.loading = false
        })
    },
    // 注销账号
    logoutUser() {
      this.login.loading = true
      const logout = this.login.mode === 'admin' ? logoutAdminUser : logoutClientUser

      logout()
        .finally(() => {
          this.login.mode = ''
          this.login.loading = false
          this.login.username = ''
          this.is_login = false

          util.cookies.remove('mode')
          util.cookies.remove('name')
          util.cookies.remove('token')

          this.setCaptcha()
        })
    },
    // 设置账号信息
    setLoginInfo() {
      this.is_login = Boolean(util.cookies.get('token'))
      this.login.mode = util.cookies.get('mode')
      this.login.username = util.cookies.get('name')
    },
    // 获取登录状态
    getLoginInfo() {
      let status = this.$t('guest')
      if (this.is_login) {
        status = this.login.mode === 'admin' ? this.$t('admin group') : this.$t('client group')
      }

      return `${this.$t('account')} (${status})`
    },
    // 确认填入菜单
    confirmMenu(value) {
      this.request.url = this.setting.apiURL + value.url
      this.request.payload = value.payload
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
      width: 95px;
    }

    /deep/ .el-input-group__append {
      padding: 0;
      background-color: #FFF;
    }
  }
</style>
