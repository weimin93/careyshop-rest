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
 * 生成随机len位数字
 * @param len
 * @param date
 * @returns {string}
 */
util.randomLenNum = (len, date = false) => {
  let random
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
  return date ? random + Date.now() : random
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
 * 替换对象中指定的替换值
 * @param data
 * @param replace
 * @returns {*}
 */
util.dataReplace = (data, replace) => {
  for (let value of data) {
    for (let key in value) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        continue
      }

      if (Object.prototype.hasOwnProperty.call(replace, key)) {
        value[key] = replace[key][value[key]]
      }
    }
  }

  return data
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
 * 生成 GUID
 * @returns {string}
 */
util.guid = () => {
  let s = []
  const hexDigits = '0123456789abcdef'

  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }

  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  return s.join('')
}

/**
 * 签名生成
 * @param params
 * @returns {*}
 */
// util.getSign = (params) => {
//   let sorted = Object.keys(params).sort()
//   let basestring = serverConfig.APP_SECRET
//   const type = ['undefined', 'object', 'function']
//
//   for (let i = 0, l = sorted.length; i < l; i++) {
//     if (sorted[i] === 'sign') {
//       continue
//     }
//
//     let k = sorted[i]
//     if (type.indexOf(typeof params[k]) === -1) {
//       basestring += k + (typeof params[k] === 'boolean' ? Number(params[k]) : params[k])
//     }
//   }
//
//   basestring += serverConfig.APP_SECRET
//   return util.md5(basestring)
// }

/**
 * 数字 格式化
 * @param num
 * @param digits
 * @returns {string}
 */
util.numberFormatter = (num, digits = 2) => {
  const si = [
    { value: 1E18, symbol: 'EB' },
    { value: 1E15, symbol: 'PB' },
    { value: 1E12, symbol: 'TB' },
    { value: 1E9, symbol: 'GB' },
    { value: 1E6, symbol: 'MB' },
    { value: 1E3, symbol: 'KB' }
  ]

  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }

  return num.toString()
}

/**
 * 字节转字符串单位
 * @param bytes
 * @param spacer
 * @returns {string}
 */
util.bytesFormatter = (bytes, spacer = ' ') => {
  if (isNaN(bytes)) {
    return ''
  }

  const symbols = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let exp = Math.floor(Math.log(bytes) / Math.log(2))

  if (exp < 1) {
    exp = 0
  }

  const i = Math.floor(exp / 10)
  bytes = bytes / Math.pow(2, 10 * i)

  if (bytes.toString().length > bytes.toFixed(2).toString().length) {
    bytes = bytes.toFixed(2)
  }

  // bytes + symbols[i]
  return `${bytes}${spacer}${symbols[i]}`
}

/**
 * 将数值保留2位小数返回(不会四舍五入)
 * @param value
 * @returns {string}
 */
util.getNumber = (value) => {
  const toFixedNum = Number(value).toFixed(3)
  return value ? toFixedNum.substring(0, toFixedNum.toString().length - 1) : '0.00'
}

/**
 * 笛卡尔积算法
 * @param array
 * @returns {*|*[]|U}
 */
util.descartes = (array) => {
  if (array.length < 2) {
    return array[0] || []
  }

  return [].reduce.call(array, (col, set) => {
    let res = []
    col.forEach((c) => {
      set.forEach((s) => {
        let t = [].concat(Array.isArray(c) ? c : [c])
        t.push(s)
        res.push(t)
      })
    })

    return res
  })
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

/**
 * 检测是否为IE游览器
 * @returns {boolean}
 */
util.isIE = () => {
  // return !Vue.prototype.$isServer && !isNaN(Number(document.documentMode))
  return !isNaN(Number(document.documentMode))
}

/**
 * 版本号比较
 * @param curV
 * @param reqV
 * @returns {boolean}
 */
util.compareVersion = (curV, reqV) => {
  if (!curV || !reqV) {
    return false
  }

  const arr1 = curV.split('.')
  const arr2 = reqV.split('.')
  const minLength = Math.min(arr1.length, arr2.length)

  let position = 0
  let diff = 0

  while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) === 0)) {
    position++
  }

  diff = (diff !== 0) ? diff : (arr1.length - arr2.length)
  return diff > 0
}

export default util
