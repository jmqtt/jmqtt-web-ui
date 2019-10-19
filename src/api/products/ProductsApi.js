import request from '@/utils/request'

/**
 * 产品管理
 */
export default {
  list (data) {
    return request({
      url: '/api/v1/products?_page=1&_limit=9',
      method: 'get'
    })
  },
  /**
   * ids
   * @param data
   */
  delete (data) {
    return request({
      url: '/api/v1/products/delete',
      method: 'post',
      data
    })
  }
}
