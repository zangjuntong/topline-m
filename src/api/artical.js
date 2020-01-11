// 文章模块
import request from '@/utils/request.js'
// 登录
export const getArticals = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
