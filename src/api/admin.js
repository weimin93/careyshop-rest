import request from '@/plugin/axios/request'

const url = request.defaults.url ? request.defaults.url + 'admin' : 'admin'

/**
 * 账号登录，并且获取授权码
 * @param {Object} data
 * @returns
 */
export function loginAdminUser(data) {
  return request({
    url,
    method: 'post',
    data: {
      method: 'login.admin.user',
      platform: 'rest api',
      ...data
    }
  })
}

/**
 * 注销当前已登录的账号
 * @returns
 */
export function logoutAdminUser() {
  return request({
    url,
    method: 'post',
    data: {
      method: 'logout.admin.user'
    }
  })
}
