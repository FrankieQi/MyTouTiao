import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: () => import ('@/views/login/')
    //会自动找到文件夹下的index.vue进行导入
},{
    path: '/',
    name: 'layout',
    component: () => import ('@/views/layout/'),
    children:[
        {
            path: '', //默认的子路由
            name: 'home',
            component: ()=>import ('@/views/home/'),
        },{
            path: '/qa', //问答子路由
            name: 'qa',
            component: ()=>import ('@/views/qa/'),
        },{
            path: '/video', //视频子路由
            name: 'video',
            component: ()=>import ('@/views/video/'),
        },{
            path: '/my', //视频子路由
            name: 'my',
            component: ()=>import ('@/views/my/'),
        }
    ]
}]

const router = new VueRouter({
    routes
})

export default router