/**
 * 文章相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章列表
 */
//传一个对象
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}