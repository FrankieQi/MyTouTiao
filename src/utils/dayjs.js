/**
 * 初始化dayjs的相关配置
 */
import dayjs from 'dayjs'
import Vue from 'vue'
//配置中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

//使用vue的过滤器，第一个函数是函数名第二个是操作
Vue.filter('relativeTime', value => {
    return dayjs().from(dayjs(value))
  })

Vue.filter('dateTime',value => {
  return dayjs(value).format('MM-DD HH:mm')
})