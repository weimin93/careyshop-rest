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

      state.history.unshift({
        key: Date.now(),
        ...value
      })

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
      for (let i = state.history.length - 1; i >= 0; i--) {
        if (state.history[i].key === key) {
          state.history.splice(i, 1)
          break
        }
      }

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
