import util from '@/utils/util'
import axios from 'axios'

export default {
  methods: {
    _replace(value) {
      return util.settingReplace(value, this.setting.variable)
    },
    cancel() {
      // this.sendEnd = true
      // this.sendLoading = false
    },
    async submit() {
      // 解析请求地址
      let url = this._replace(this.request.url)

      // 解析请求参数
      let payload = this._replace(this.request.payload)

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
        timeout: 30000,
        headers: headers
      })

      service({
        params: { method: 'get.article.list' }
      })
        .then(res => {
          console.log(res)
        })
    }
  }
}
