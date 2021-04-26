/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'
import store from '@/store/'

/**
 * 注册
 */
 export const register = data=>{
  return request({
      method: 'POST',
      url:'/api/v1/user/register',
      data
  })
}

/**
 * 登录
 */
export const login = data=>{
  return request({
      method: 'POST',
      url:'/api/v1/user/login',
      data
  })
}

/**
 * 获取token
 */
 export const getToken = id =>{
  return request({
      method: 'GET',
      url:`/api/v1/token/gettoken?uid=${id}`
  })
}

/**
 *  邮箱发送验证码
 */
 export const sendEmail = email=>{
  return request({
      method: 'GET',
      url:`api/v1/email/getcode?email=${email}`
  })
}
// export const login =data=>{
//     return request({
//         method: 'POST',
//         url:'/app/v1_0/authorizations',
//         data
//     })
// }
//导出一个函数

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
    url: `/api/v1/user/info`,
    headers: {
      token: `${store.state.user.token}`
    }
  })
}

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/api/v1/category/getcategorylist'
  })
}

/**
 * 关注用户
 */

export const addFollow = (userId) => {
  return request({
    method: 'POST',
    url: '/api/v1/relation/follow',
    data: {
      follow_id: userId,
      token: `${store.state.user.token}`
    },
    headers: {
      token: `${store.state.user.token}`
    }
  })
}

/**
 * 取消关注用户
 */

export const deleteFollow = (userId) => {
  return request({
    method: 'POST',
    url: `/api/v1/relation/del`,
    data: {
      follow_id: userId,
      token: `${store.state.user.token}`
    },
    headers: {
      token: `${store.state.user.token}`
    }
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
    method: 'POST',
    url: `/api/v1/user/edit`,
    data,
    headers: {
      token: `${store.state.user.token}`
    }
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
 export const getUserCollectList = (data) => {
  return request({
      methods: 'POST',
      url:'/api/v1/collect/collectlist',
      data,
      headers: {
        token: `${store.state.user.token}`
      }
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
      url:'/api/v1/relation/followlist',
      params,
      headers: {
        token: `${store.state.user.token}`
      }
  })
}

/**
 * 获取用户粉丝列表
 */
 export const getUserFansList = (params) => {
  return request({
      methods: 'GET',
      url:'/api/v1/relation/fanslist',
      params,
      headers: {
        token: `${store.state.user.token}`
      }
  })
}

/**
 * 获取用户点赞总数
 */
 export const getUserLikeNum = () => {
  return request({
      methods: 'GET',
      url:'/api/v1/user/upvotesum',
      headers: {
        token: `${store.state.user.token}`
      }
  })
}