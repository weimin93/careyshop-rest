import { database as getDatabase, dbGet, dbSet } from '@/utils/util.db'

export default {
  namespaced: true,
  actions: {
    /**
     * @description 将数据存储到指定位置 | 路径不存在会自动初始化
     * @description 效果类似于取值 dbName.path = value
     * @param {Object} context
     * @param {Object} payload dbName {String} 数据库名称
     * @param {Object} payload path {String} 存储路径
     * @param {Object} payload value {*} 需要存储的值
     */
    set(context, {
      dbName = 'database',
      path = '',
      value = ''
    }) {
      dbSet({ dbName, path, value })
    },
    /**
     * @description 获取数据
     * @description 效果类似于取值 dbName.path || defaultValue
     * @param {Object} context
     * @param {Object} payload dbName {String} 数据库名称
     * @param {Object} payload path {String} 存储路径
     * @param {Object} payload defaultValue {*} 取值失败的默认值
     */
    get(context, {
      dbName = 'database',
      path = '',
      defaultValue = ''
    }) {
      return dbGet({ dbName, path, defaultValue })
    },
    /**
     * @description 获取存储数据库对象
     * @param {Object} context
     */
    database(context) {
      return getDatabase({
        defaultValue: {}
      })
    },
    /**
     * @description 清空存储数据库对象
     * @param {Object} context
     */
    databaseClear(context) {
      return getDatabase({
        validator: () => false,
        defaultValue: {}
      })
    }
  }
}
