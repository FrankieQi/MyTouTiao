/**
 * 文章的评论模块
 */
import request from '@/utils/request'
import store from '@/store/'
export const getComments = params => {
    return request({
      method: 'GET',
      url: '/api/v1/discuss/list',
      params,
      headers: {
        token: `${store.state.user.token}`
      }
    })
  }

/**
 * 对评论或者回复点赞
 */

export const addCommentLike = data => {
  return request({
    method: 'POST',
    url: '/api/v1/discuss/upvote',
    data,
    headers: {
      token: `${store.state.user.token}`
    }
  })
}

/**
 * 取消对评论或者回复点赞
 */

export const deleteCommentLike = commentId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${commentId}`,
  })
}

/**
 * 添加评论或者回复评论
 */

export const addComment = data => {
  return request({
    method: 'POST',
    url: `/api/v1/discuss/add`,
    data,
    headers: {
      token: `${store.state.user.token}`
    }
  })
}