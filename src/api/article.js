/**
 * 文章相关请求模块
 */
import request from '@/utils/request'
import store from '@/store/'
/**
 * 获取文章列表
 */
//传一个对象
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: 'api/v1/news/getnewslist',
    params
  })
}

/**
 * 获取文章详情
 */

export const getArticleById = params => {
  return request({
    method: 'GET',
    url: `/api/v1/news/getnewsinfo`,
    params,
    headers: {
      token: `${store.state.user.token}`
    }
  })
}

/**
 * 收藏文章
 */
export const addCollect = data => {
  return request({
    method: 'POST',
    url: `/api/v1/collect/collect`,
    data,
    headers: {
      token: `${store.state.user.token}`
    }
  })
}

/**
 * 取消收藏
 */

export const deleteCollect = data => {
  return request({
    method: 'POST',
    url: `/api/v1/collect/del`,
    data,
    headers: {
      token: `${store.state.user.token}`
    }
  })
}
/**
 * 点赞文章
 */
export const addLike = params => {
  return request({
    method: 'GET',
    url: `/api/v1/news/upvote`,
    params,
    headers: {
      token: `${store.state.user.token}`
    }
  })
}

/**
 * 取消点赞
 */

export const deleteLike = params => {
  return request({
    method: 'GET',
    url: `/api/v1/news/delUpvote`,
    params,
    headers: {
      token: `${store.state.user.token}`
    }
  })
}