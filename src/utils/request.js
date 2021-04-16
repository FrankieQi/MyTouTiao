/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store/'
import jsonBig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router/'
const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
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


//响应拦截器  (一般用来处理错误信息)
request.interceptors.response.use(function(response) {
  // 响应成功进入这里
  return response
}, async function(error) {
  // 任何响应码超出2xx的都会走到这里
  console.log('有问题')
  const status = error.response.status
  switch (status) {
    case 400:
      // 客户端错误,请求参数错误
      Toast.fail('参数异常')
      break;
    case 401:
      // 用户登录过期
      // token无效
      // 如果没有user或者user.token，直接去登录
      const { user } = store.state
      if (!user || !user.token) {
        // 调转到登录页
        return redirectLogin() 
      }
      // 如果有refresh_token，请求获取新的token
      // 拿到新的token后把她更新到容器中
      try {
        const { data} =await refreshTokenReq({
          method: 'PUT',
          url:'/app/v1_0/authorization',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        user.token = data.data.token
        store.commit('setUser', user) // 更新到容器中
        return request(error.config)         
      } catch (error) {
        // 刷新token失败了，直接跳转登录页
        redirectLogin()
      }
      break;
    case 403:
      // 禁止访问
      Toast.fail('禁止访问，无权限')
      break;
    case status>500: 
      Toast.fail('服务器异常，稍后重试')
      break;
  }

  // 抛出异常
  return Promise.reject(error)
})

function redirectLogin() {
  // 重定向到登录页
  router.replace('/login')
}
//导出
export default request