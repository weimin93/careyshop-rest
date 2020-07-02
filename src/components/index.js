import Vue from 'vue'

// 注意 有些组件使用异步加载会有影响
Vue.component('cs-highlight', () => import('./cs-highlight'))
Vue.component('cs-icon', () => import('./cs-icon'))
Vue.component('cs-icon-svg', () => import('./cs-icon-svg'))
