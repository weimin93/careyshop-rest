import Vue from 'vue'
import VueRouter from 'vue-router'

import util from '@/utils/util'
import Layout from '@/views/Layout'

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
      redirect: { name: 'Index' },
      component: Layout,
      children: [
        {
          path: '/index',
          name: 'Index',
          component: () => import('@/views/Index')
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
          meta: { title: '历史' },
          component: () => import('@/views/History')
        },
        {
          path: '/help',
          name: 'Help',
          meta: { title: '帮助' },
          component: () => import('@/views/Help')
        },
        {
          path: 'refresh',
          name: 'refresh',
          hidden: true,
          component: {
            beforeRouteEnter(to, from, next) {
              next(instance => instance.$router.replace(from.fullPath))
            },
            render: h => h()
          }
        }
      ]
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
