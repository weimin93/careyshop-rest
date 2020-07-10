import util from '@/utils/util'
import axios from 'axios'
import qs from 'qs'

export default {
  methods: {
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

        signSteps.push(JSON.stringify(sorted))

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
      this.sendEnd = false
      this.sendLoading = true

      await this.$nextTick()
      this.percentage = 60
      this.response = {}

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

      // 请求耗时
      let startTime = Date.now()

      // 实际请求
      service({
        params: this.methodName === 'params' ? payload : undefined,
        data: this.methodName !== 'params' ? payload : undefined
      })
        .then(res => {
          this.response = res
        })
        .catch(err => {
          this.response = err
        })
        .finally(() => {
          this.percentage = 100
          this.response.millis = (Date.now() - startTime) / 1000
          this.response.signSteps = signSteps

          setTimeout(() => {
            this.sendLoading = false
            this.sendEnd = true
          }, 500)

          console.log('----------------')
          console.dir(this.response)
        })
    }
  }
}
