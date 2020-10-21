/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store/'
import jsonBig from 'json-bigint'
const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/', //基准路径
    transformResponse: [function (data) {
        try {
          // 后端返回的数据可能不是JSON格式的，如果不是的话那么Json.bigint是无法解析的所以要用try catch处理异常
          // 如果转换成功则返回转换的数据结果
          return jsonBig.parse(data)  
          // return jsonBig.parse(data).art_id.toString();
        } catch (err) {
          console.log('转化失败',err);
          // 如果转换失败，则包装为统一数据格式并返回
          return data
        }
      }]
})

//请求拦截器
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    const { user } = store.state

    // 如果用户已登录，统一给接口设置 token 信息
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // 处理完之后一定要把 config 返回，否则请求就会停在这里
    return config
    }, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

//响应拦截器

//导出
export default request