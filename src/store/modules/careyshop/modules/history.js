export default {
  namespaced: true,
  state: {
    history: [],
    isLoaded: false
  },
  actions: {
    /**
     * @description 从数据库取数据
     * @param context
     * @param dispatch
     * @returns {Promise<void>}
     */
    async load({ state, dispatch }) {
      // store 赋值
      state.history = await dispatch('careyshop/db/get', {
        path: 'history',
        defaultValue: []
      }, { root: true })
      state.isLoaded = true
    },
    /**
     * 将 history 属性赋值并持久化
     * @param state
     * @param dispatch
     * @returns {Promise<void>}
     */
    async openecsdb({ state, dispatch }) {
      // 设置数据
      dispatch('careyshop/db/set', {
        path: 'history',
        value: state.history
      }, { root: true })
    },
    /**
     * 添加历史记录
     * @param state
     * @param dispatch
     * @param value
     * @returns {Promise<void>}
     */
    async addHistory({ state, dispatch }, value) {
      if (!state.isLoaded) {
        await dispatch('load')
      }

      state.history.unshift(value)
      await dispatch('openecsdb')
    },
    /**
     * 删除历史记录
     * @param state
     * @param dispatch
     * @param key
     * @returns {Promise<void>}
     */
    async delHistory({ state, dispatch }, key) {
      state.history.splice(key, 1)
      await dispatch('openecsdb')
    },
    /**
     * 清空历史记录
     * @param state
     * @param dispatch
     * @returns {Promise<void>}
     */
    async cleanHistory({ state, dispatch }) {
      state.history = []
      await dispatch('openecsdb')
    }
  }
}
