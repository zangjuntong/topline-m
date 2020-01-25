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
// 获取联想建议
export const getSuggestion = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索列表
export const getSearch = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}

//  获取新闻文章详情
export const getArticalShow = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}
// 收藏文章
export const addCollect = articleId => {
  return request({
    method: 'POST',
    url: `/app/v1_0/article/collections`,
    data: {
      target: articleId
    }

  })
}
// 取消收藏文章
export const deleteCollect = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleId}`
  })
}
// 点赞文章
export const addAttitude = articleId => {
  return request({
    method: 'POST',
    url: `/app/v1_0/article/likings`,
    data: {
      target: articleId
    }

  })
}
// 取消点赞文章
export const deleteAttitude = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}
// 添加关注
export const addFollow = articleId => {
  return request({
    method: 'POST',
    url: `/app/v1_0/user/followings`,
    data: {
      target: articleId
    }

  })
}
// 取消关注
export const deleteFollow = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${articleId}`
  })
}
// 获取评论
export const getComments = params => {
  return request({
    method: 'GET',
    url: `/app/v1_0/comments`,
    params
  })
}
// 发布评论
export const addComments = data => {
  return request({
    method: 'POST',
    url: `/app/v1_0/comments`,
    data
  })
}
