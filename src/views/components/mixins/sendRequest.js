import util from '@/utils/util'
import axios from "axios";

export default {
  methods: {
    cancel() {
      // this.sendEnd = true
      // this.sendLoading = false
    },
    async submit() {
      // 解析请求地址
      let url = util.settingReplace(this.request.url, this.setting.variable)

      // 解析请求参数
      let payload = util.settingReplace(this.request.payload, this.setting.variable)

      // 解析请求头
      let headers = {}
      this.headers.forEach(val => {
        const name = util.settingReplace(val.name, this.setting.variable)
        headers[name] = util.settingReplace(val.value, this.setting.variable)
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
        headers: headers,
        withCredentials: true
      })

      console.dir(service)
    }
  }
}
