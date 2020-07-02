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

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home')
    },
    {
      path: '/favorites',
      name: 'Favorites',
      meta: { title: '收藏夹' },
      component: () => import('@/views/Favorites')
    },
    {
      path: '/history',
      name: 'History',
      meta: { title: '历史记录' },
      component: () => import('@/views/History')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/404')
    }
  ]
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
