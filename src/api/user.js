// 用户登录模块
import request from '@/utils/request.js'
// 登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 获取验证码
export const getSmsCode = (mobile) => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: `/app/v1_0/user`
  })
}
// 获取频道列表
export const getUserChannels = () => {
  return request({
    method: 'get',
    url: `/app/v1_0/user/channels`
  })
}
// 获取所有频道
export const getAllChannels = () => {
  return request({
    method: 'get',
    url: `/app/v1_0/channels`
  })
}
// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    method: 'get',
    url: `/app/v1_0/user/profile`
  })
}
// 编辑用户个人资料
export const editUserProfile = data => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/profile`,
    data
  })
}
// 编辑用户个人照片资料
export const editUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/photo`,
    data
  })
}
