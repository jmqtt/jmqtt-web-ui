import axios from 'axios'

import { Message } from 'element-ui'

import Storage from '@/storage'
// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  baseURL: '', // api 的 base_url
  timeout: 300 * 1000 // 300s
})

// request interceptor
service.interceptors.request.use(config => {
    // Do something before request is sent
    const AUTH_TOKEN = Storage.getItem('AUTH_TOKEN')
    if (AUTH_TOKEN) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = AUTH_TOKEN
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== '0') {
  //     if (res.code === '1000000') {
  //       MessageBox.confirm('出现未知错误', '操作错误', { type: 'error' }).then(() => {
  //       })
  //     }
  //     if (res.code === '1005000') {
  //       MessageBox.confirm('参数验证不通过', '操作错误', { type: 'error' }).then(() => {
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response
  //   }
  // },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
