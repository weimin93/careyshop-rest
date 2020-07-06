// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// flex 布局库
import 'flex.css'

// 组件
import '@/components'
// 国际化
import i18n from '@/i18n.js'

// 功能插件
import pluginOpen from '@/plugin/open'
import pluginAxios from '@/plugin/axios'

export default {
  async install(Vue, options) {
    // 导入组件
    require('@careyshop/stats')

    // 设置为 false 以阻止 vue 在启动时生成生产提示。
    Vue.config.productionTip = false
    // 当前环境
    Vue.prototype.$env = process.env.NODE_ENV
    // 当前的 publicPath
    Vue.prototype.$publicPath = process.env.BASE_URL
    // 当前版本
    Vue.prototype.$version = process.env.VUE_APP_VERSION
    // 构建时间
    Vue.prototype.$buildTime = process.env.VUE_APP_BUILD_TIME

    // Element
    Vue.use(ElementUI, {
      i18n: (key, value) => i18n.t(key, value)
    })

    // 插件
    Vue.use(pluginOpen)
    Vue.use(pluginAxios)
  }
}
