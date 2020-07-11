export default {
  namespaced: true,
  state: {
    // 自定义请求头
    headers: [],
    examples: [
      { name: 'Accept', value: 'application/json', key: 0 },
      { name: 'Cache-Control', value: 'no-cache', key: 1 },
      { name: 'Content-Type', value: 'application/json', key: 2 },
      { name: 'Content-Type', value: 'text/plain', key: 3 }
    ]
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
      state.headers = await dispatch('careyshop/db/get', {
        path: 'headers',
        defaultValue: []
      }, { root: true })
    },
    /**
     * 将 headers 属性赋值并持久化
     * @param state
     * @param dispatch
     * @returns {Promise<void>}
     */
    async openecsdb({ state, dispatch }) {
      // 设置数据
      dispatch('careyshop/db/set', {
        path: 'headers',
        value: state.headers
      }, { root: true })
    },

    /**
     * 新增自定义请求头
     * @param state
     * @param dispatch
     * @param name
     * @param value
     * @returns {Promise<void>}
     */
    async addHeader({ state, dispatch }, value) {
      state.headers.unshift({
        ...value,
        key: Date.now()
      })
      await dispatch('openecsdb')
    },
    /**
     * 删除自定义请求头
     * @param state
     * @param dispatch
     * @param key
     * @returns {Promise<void>}
     */
    async delHeader({ state, dispatch }, key) {
      state.headers.splice(key, 1)
      await dispatch('openecsdb')
    },
    /**
     * 修改自定义请求头
     * @param state
     * @param dispatch
     * @param key
     * @param name
     * @param value
     * @returns {Promise<void>}
     */
    async setHeader({ state, dispatch }, { key, value }) {
      state.headers[key] = { ...value }
      await dispatch('openecsdb')
    }
  }
}
