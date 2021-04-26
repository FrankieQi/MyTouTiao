/**
 * 频道相关模块
 */

import request from '@/utils/request'
import store from '@/store/'

/**
 * 获取所有的频道列表
 */

export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/api/v1/category/getcategorylist'
    })
}

/**
 * 修改用户频道
 */
export const addUserChannel = params => {
    return request({
      method: 'POST',
      url: '/api/v1/category/addcategory',
      params,
      headers: {
        token: `${store.state.user.token}`
      }
    })
  }

/**
 * 删除用户指定频道
 */
export const deleteUserChannel = data => {
    return request({
      method: 'POST',
      url: `/api/v1/category/delcategory`,
      data,
      headers: {
        token: `${store.state.user.token}`
      }
    })
  }