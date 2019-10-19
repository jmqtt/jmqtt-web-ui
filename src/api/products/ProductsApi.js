import request from '@/utils/request'

/**
 * 产品管理
 */
export default {
  list(data) {
    return request({
      url: '/api/v1/products/list',
      method: 'post',
      data
    })
  },
  /**
   * ids
   * @param data
   */
  delete(data) {
    return request({
      url: '/api/v1/products/delete',
      method: 'post',
      data
    })
  }
}
