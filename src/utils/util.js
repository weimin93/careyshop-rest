import db from './util.db'
import log from './util.log'

let util = {
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} titleText 标题
 */
util.title = (titleText) => {
  window.document.title = `${titleText ? `${titleText} - ` : ''}${process.env.VUE_APP_TITLE}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = (url) => {
  if (url === '/') {
    url = document.location.origin
  }

  const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
  if (!reg.test(url)) {
    url = document.location.protocol + '//' + url
  }

  let a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'careyshop-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('careyshop-link-temp'))
}

/**
 * MD5加密
 * @param str
 * @returns {*}
 */
util.md5 = (str) => {
  let crypto = require('crypto')
  let md5 = crypto.createHash('md5')

  md5.update(str)
  return md5.digest('hex')
}

/**
 * 删除数据中指定的列表
 * @param data
 * @param id
 * @param key
 */
util.deleteDataList = (data, id, key) => {
  for (let i = data.length - 1; i >= 0; i--) {
    if (id.indexOf(data[i][key]) !== -1) {
      data.splice(i, 1)
    }
  }
}

/**
 * 将任意对象转化为树
 * @param data
 * @param key
 * @param pid
 * @param parent
 * @returns {Array}
 */
util.formatDataToTree = (data, key = 'menu_id', pid = 'parent_id', parent = {}) => {
  if (!data || Object.keys(data).length <= 0) {
    return []
  }

  let map = {}
  const isSetParent = Object.keys(parent).length > 0

  data.forEach(value => {
    if (isSetParent && parent.value.includes(value[parent.key])) {
      value[pid] = 0
    }

    map[value[key]] = { ...value }
  })

  let tree = []
  for (let id in data) {
    if (!Object.prototype.hasOwnProperty.call(data, id)) {
      continue
    }

    // 对应索引
    const index = data[id][key]
    if (!Object.prototype.hasOwnProperty.call(map, index)) {
      continue
    }

    // 子节点压入
    if (map[index][pid]) {
      if (!map[map[index][pid]]) {
        continue
      }

      if (!Object.prototype.hasOwnProperty.call(map[map[index][pid]], 'children')) {
        map[map[index][pid]].children = []
      }

      map[map[index][pid]].children.push(map[index])
      continue
    }

    tree.push(map[index])
  }

  return tree
}

/**
 * 字符计量大小转换为字节大小
 * @param value
 * @returns {number}
 */
util.stringToByte = (value) => {
  const exp = '(^[0-9\\.]+)(\\w+)'
  const result = value.match(exp)

  if (!result) {
    return 0
  }

  const size = result[1]
  const suffix = result[2].toLocaleUpperCase()

  const a = { B: 0, KB: 1, MB: 2, GB: 3, TB: 4, PB: 5 }
  const b = { B: 0, K: 1, M: 2, G: 3, T: 4, P: 5 }

  const pos = Object.prototype.hasOwnProperty.call(a, suffix) && a[suffix] !== 0 ? a[suffix] : b[suffix]
  return Math.round(size * Math.pow(1024, pos))
}

/**
 * 验证URL地址
 * @param url
 * @returns {string|*}
 */
util.checkUrl = (url) => {
  if (url) {
    const blob = /^(blob)[^\s]+/
    const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/

    if (!blob.test(url) && !reg.test(url)) {
      return document.location.protocol + '//' + url
    }
  }

  return url
}

export default util
