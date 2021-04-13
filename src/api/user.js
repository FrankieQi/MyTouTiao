/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'
import store from '@/store/'

/**
 * 登录/注册
 */
 
export const login =data=>{
    return request({
        method: 'POST',
        url:'/app/v1_0/authorizations',
        data
    })
}//导出一个函数

/**
 * 发送短信验证码
 */

export const sendSms = mobile => {
    return request({
      method: 'GET',
      url: `/app/v1_0/sms/codes/${mobile}`
    })
  }

/**
 * 获取用户得个人信息
 */
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user`,
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

/**
 * 关注用户
 */

export const addFollow = (userId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注用户
 */

export const deleteFollow = (userId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

/**
 * 获取用户个人资料
 */
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/profile`
  })
}

/**
 * 修改用户个人资料
 */
 export const updateUserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/profile`,
    data
  })
}

/**
 * 修改用户个人头像
 */
 export const updateUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/photo`,
    data
  })
}

/**
 * 获取指定用户信息
 */
 export const getUserInfo = (userId) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/users/${userId}`
  })
}

/**
 * 获取当前用户的文章列表
 */
export const getUserArticleList = (params) => {
  return request({
      methods: 'GET',
      url:'/app/v1_0/user/articles',
      params
  })
}

/**
 * 获取用户收藏列表
 */
 export const getUserCollectList = (params) => {
  return request({
      methods: 'GET',
      url:'/app/v1_0/article/collections',
      params
  })
}

/**
 * 获取用户的浏览历史
 */
 export const getUserHistoryList = (params) => {
  return request({
      methods: 'GET',
      url:'/app/v1_0/user/histories',
      params
  })
}

/**
 * 获取用户的关注列表
 */
export const getUserFollowList = (params) => {
  return request({
      methods: 'GET',
      url:'/app/v1_0/user/followings',
      params
  })
}

/**
 * 获取用户粉丝数目
 */
 export const getUserFansList = (params) => {
  return request({
      methods: 'GET',
      url:'/app/v1_0/user/followers',
      params
  })
}