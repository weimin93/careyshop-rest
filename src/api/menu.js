import request from '@/plugin/axios/request'

const url = '/v1/menu'

/**
 * 根据权限获取菜单列表
 * @param {Object} data
 * @returns
 */
export function getMenuAuthList(data) {
  return request({
    url,
    method: 'post',
    data: {
      method: 'get.menu.auth.list',
      module: 'api',
      ...data
    }
  })
}
