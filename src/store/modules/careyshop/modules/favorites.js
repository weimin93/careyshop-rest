import dayjs from 'dayjs'

export default {
  namespaced: true,
  state: {
    favorites: [],
    isLoaded: false,
    isReturn: false
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
    },
    /**
     * 验证名称是否存在
     * @param state
     * @param dispatch
     * @param name
     * @returns {Promise<boolean>}
     */
    async checkExist({ state, dispatch }, name) {
      if (!state.isLoaded) {
        await dispatch('load')
      }

      for (let value of state.favorites) {
        if (value.name === name) {
          return true
        }
      }

      return false
    },
    /**
     * 添加到收藏夹
     * @param state
     * @param dispatch
     * @param vm
     * @param value
     * @returns {Promise<boolean>}
     */
    async addToFavorites({ state, dispatch }, { vm, value }) {
      const isExist = await dispatch('checkExist', value.name)
      if (isExist) {
        await vm.$confirm(vm.$t('favorite exist'), vm.$t('warning'), {
          type: 'warning',
          closeOnClickModal: false
        })
          .then(() => {
            state.isReturn = false
          })
          .catch(() => {
            state.isReturn = true
          })
      }

      if (state.isReturn) {
        return false
      }

      state.favorites.unshift({
        ...value,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })

      await dispatch('openecsdb')

      return true
    },
    /**
     * 删除收藏夹
     * @param state
     * @param dispatch
     * @param index
     * @returns {Promise<void>}
     */
    async delFavorites({ state, dispatch }, index) {
      state.favorites.splice(index, 1)
      await dispatch('openecsdb')
    }
  }
}
