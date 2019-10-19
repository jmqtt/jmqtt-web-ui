import request from '@/utils/request'

export default {
  login(data) {
    return request({
      url: '/api/v1/login',
      method: 'post',
      data
    })
  }
}
