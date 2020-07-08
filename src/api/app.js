import request from '@/plugin/axios/request'

const url = request.defaults.url ? request.defaults.url + 'app' : 'app'

/**
 * 查询应用验证码状态
 * @param {String} app_key
 * @returns
 */
export function getAppCaptcha(app_key) {
  return request({
    url,
    method: 'post',
    data: {
      method: 'get.app.captcha',
      appkey: app_key
    }
  })
}
