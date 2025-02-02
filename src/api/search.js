/**
 * 搜索相关请求模块
 */

import request from '@/utils/request'
import store from '@/store/'
/**
 * 获取搜索联想建议
 */

// export const getSearchSuggestions = q => {
//     return request({
//         methods: 'GET',
//         url:'/app/v1_0/suggestion',
//         params: {
//             q //联想建议的关键词
//         }
//     })
// }
/**
 * 获取搜索结果
 */

export const getSearchResult = (params) => {
    return request({
        methods: 'GET',
        url:'/api/v1/news/search',
        params,
        headers: {
            token: `${store.state.user.token}`
        }
    })
}
/**
 * 获取用户搜索历史
 */
// export const getSearchHistories = () => {
//     return request({
//         methods: 'GET',
//         url:'/app/v1_0/search/histories'
//     })
// }