import util from '@/utils/util'

export default {
  methods: {
    cancel() {
    },
    submit() {
      // 解析请求地址
      const url = util.settingReplace(this.request.url, this.setting.variable)

      // 加载请求载体
      const payload = JSON.parse(this.request.payload)

      console.log(payload)
    }
  }
}
