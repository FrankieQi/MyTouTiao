import Vue from 'vue'
import Vuex from 'vuex'
import { getItem,setItem } from '@/utils/stroage'

Vue.use(Vuex)
//常量定义在外面,
const USER_KEY = 'toutiao-user'
export default new Vuex.Store({
  state: {
    //当前登录用户的登录状态
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser(state,data) {
      state.user = data;
      //data数据是接口返回的，里面有token和refresh token
      //由于vuex的机制中页面刷新以后数据就没了，并不是持久化数据，所以要把它放到本地存储中
      setItem(USER_KEY,state.user);
    }
  },
  actions: {
  },
  modules: {
  }
})
