import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
//自动设置rem的基准值(html标签字体大小)，导入这个就实现了rem的适配
import 'amfe-flexible'
import './style/index.less'
//全局注册vant的组件
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')