// 存入值至localStorage
export default {
  setItem (key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  },
  // 根据key拿值
  getItem (key) {
    JSON.parse(localStorage.getItem(key))
  },
  // 根据key删除值
  removeItem (key) {
    localStorage.removeItem(key)
  },
  // 清除所有的缓存
  removeAll () {
    localStorage.clear()
  }
}
