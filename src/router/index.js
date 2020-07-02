import Vue from 'vue'
import VueRouter from 'vue-router'

import util from '@/utils/util'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return VueRouterPush.call(this, location).catch(err => err)
}

const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return VueRouterReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
NProgress.configure({ showSpinner: false })

const routes = [
  {
    path: '*',
    name: '404',
    component: () => import('@/views/public/404')
  }
]

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes
})

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(to => {
  NProgress.done()
  util.title(to.meta.title)
})

export default router
