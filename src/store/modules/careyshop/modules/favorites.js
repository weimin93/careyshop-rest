export default {
  namespaced: true,
  state: {
    favorites: [],
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
      state.favorites = await dispatch('careyshop/db/get', {
        path: 'favorites',
        defaultValue: []
      }, { root: true })
      state.isLoaded = true
    },
    /**
     * 将 favorites 属性赋值并持久化
     * @param state
     * @param dispatch
     * @returns {Promise<void>}
     */
    async openecsdb({ state, dispatch }) {
      // 设置数据
      dispatch('careyshop/db/set', {
        path: 'favorites',
        value: state.favorites
      }, { root: true })
    }
  }
}
