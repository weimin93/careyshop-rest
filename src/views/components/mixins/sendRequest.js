import { mapActions } from 'vuex'
import util from '@/utils/util'
import axios from 'axios'
import qs from 'qs'

export default {
  methods: {
    ...mapActions('careyshop/history', [
      'addHistory'
    ]),
    _replace(value) {
      return util.settingReplace(value, this.setting.variable)
    },
    cancel() {
      this._cancel('Operation canceled by the user.')
    },
    async submit() {
      // 重置进度条
      this.percentage = 0

      // 解析请求地址
      let url = this._replace(this.request.url)
      if (!/^http[s]?:\/\/.*/.test(url)) {
        url = document.location.protocol + '//' + url
      }

      // 处理请求参数(尝试解析为JSON)
      let payload = this._replace(this.request.payload)

      // 尝试解码为对象
      if (payload) {
        try {
          payload = await JSON.parse(payload)
        } catch (e) {
          try {
            payload = qs.parse(payload, { ignoreQueryPrefix: true })
          } catch (e) {
          }
        }
      } else {
        payload = {}
      }

      // 补齐参数与签名
      let signSteps = []
      const getSign = () => {
        // step1
        let sorted = Object.keys(payload).sort()
        let secret = this.setting.appSecret || ''

        signSteps.push(JSON.stringify(sorted, null, 4))

        // step2
        let basestring = secret
        const type = ['undefined', 'object', 'function']

        for (let i = 0, l = sorted.length; i < l; i++) {
          if (sorted[i] === 'sign') {
            continue
          }

          let k = sorted[i]
          if (type.indexOf(typeof payload[k]) === -1) {
            basestring += k + (typeof payload[k] === 'boolean' ? Number(payload[k]) : payload[k])
          }
        }

        basestring += secret
        signSteps.push(basestring)

        // step3
        let signMD5 = util.md5(basestring)
        signSteps.push(signMD5)

        return signMD5
      }

      payload.appkey = this.setting.appKey || ''
      payload.timestamp = Math.round(new Date() / 1000) + 100
      payload.token = util.cookies.get('token') || undefined
      payload.sign = getSign()

      // 解析请求头
      let headers = {}
      this.headers.forEach(val => {
        const name = this._replace(val.name)
        headers[name] = this._replace(val.value)
      })

      // 初始化各类数据
      this.sendLoading = true
      await this.$nextTick()
      this.percentage = 60

      // 创建一个axios实例
      const service = axios.create({
        baseURL: url,
        method: this.request.method,
        timeout: 15000,
        headers: headers,
        cancelToken: new axios.CancelToken(c => {
          this._cancel = c
        })
      })

      // 实际请求
      let result = {}
      let startTime = Date.now()

      service({
        params: this.request.methodName === 'params' ? payload : undefined,
        data: this.request.methodName !== 'params' ? payload : undefined
      })
        .then(res => {
          result = res
        })
        .catch(err => {
          result = err.response || err
        })
        .finally(() => {
          this.percentage = 100
          result.signSteps = signSteps
          result.millis = `${(Date.now() - startTime) / 1000} seconds`

          setTimeout(() => {
            if (Object.prototype.hasOwnProperty.call(result.headers, 'x-powered-by')) {
              delete result.headers['x-powered-by']
            }

            this.sendLoading = false
            this.response = result

            let history = {}
            history.mode = this.login.mode
            history.request = { ...this.request }
            history.headers = [...this.headers]
            history.response = { ...this.response }
            this.addHistory(history)
          }, 500)
        })
    }
  }
}
