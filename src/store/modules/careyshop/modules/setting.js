export default {
  namespaced: true,
  state: {
    // 配置数据
    setting: {}
  },
  actions: {
    /**
     * @description 设置配置数据
     * @param context
     * @param dispatch
     * @param data
     * @returns {Promise<void>}
     */
    async set({ state, dispatch }, data) {
      // store 赋值
      state.setting = data
      // 持久化
      await dispatch('careyshop/db/set', {
        path: 'setting',
        value: data
      }, { root: true })
    },
    /**
     * @description 从数据库取数据
     * @param context
     * @param dispatch
     * @returns {Promise<void>}
     */
    async load({ state, dispatch }) {
      // store 赋值
      state.setting = await dispatch('careyshop/db/get', {
        path: 'setting',
        defaultValue: {
          apiBase: process.env.VUE_APP_API_BASE,
          appKey: process.env.VUE_APP_KEY,
          appSecret: process.env.VUE_APP_SECRET,
          variable: []
        }
      }, { root: true })
    }
  }
}
