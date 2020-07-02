import Vue from 'vue'
import App from './App.vue'

import store from '@/store'
import careyshop from '@/plugin/careyshop'

import router from './router'

// 核心插件
Vue.use(careyshop)

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    // 展示系统信息
    this.$store.commit('careyshop/releases/versionShow')
  }
}).$mount('#app')
