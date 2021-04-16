import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store/'
// 非组件中必须这么引入不能用this
Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import ('@/views/login/'),
        //会自动找到文件夹下的index.vue进行导入
        meta: {requiresAuth: false} // 添加额外的自定义数据
        // true的意思是登录才能访问
    },{
        path: '/',
        name: 'layout',
        component: () => import ('@/views/layout/'),
        children:[
            {
                path: '', //默认的子路由
                name: 'home',
                component: ()=>import ('@/views/home/'),
                meta: {requiresAuth: true}
            },{
                path: '/qa', //问答子路由
                name: 'qa',
                component: ()=>import ('@/views/qa/'),
                meta: {requiresAuth: false}
            },{
                path: '/video', //视频子路由
                name: 'video',
                component: ()=>import ('@/views/video/'),
                meta: {requiresAuth: false}
            },{
                path: '/my', //个人子路由
                name: 'my',
                component: ()=>import ('@/views/my/'),
                meta: {requiresAuth: false}
            }
        ]
    },{
        path: '/search',
        name: 'search',
        component: () => import ('@/views/search/')
    },{
        path: '/article/:articleId',
        name: 'article',
        component: () => import ('@/views/article/'),
        props: true
    },{
        path: '/user/profile',
        name: 'user-profile',
        component: () => import('@/views/user-profile/index'),
        meta: {requiresAuth: false}
    },{
        path: '/user/chat',
        name: 'user-chat',
        component: () => import('@/views/user-chat/index'),
        meta: {requiresAuth: true}
    },{
        path: '/post/:postId',
        name: 'post',
        component: () => import('@/views/post/'),
        props: true
    },{
        path: '/user/:userId',
        name: 'user-info',
        component: () => import('@/views/user-info/index'),
        props: true
    },{
        path:'/love',
        name: 'user-love',
        component: () => import('@/views/user-love/index'),
    },{
        path:'/follow/:userId',
        name: 'user-follow',
        component: () => import('@/views/user-follow/'),
        props: true,
        children:[
            {
                path: '/follow/:userId/follow', //默认的子路由
                name: 'follow',
                component: ()=>import ('@/views/follow/'),
                props: true,
                meta: {requiresAuth: true}
            },{
                path: '/follow/:userId/fans', //问答子路由
                name: 'fans',
                component: ()=>import ('@/views/fans/'),
                props: true,
                meta: {requiresAuth: false}
            }
        ]
    },{
        path:'/qrCode',
        name: 'qrCode',
        component: () => import('@/views/qrCode/'),
    }]

const router = new VueRouter({
    routes
})

// to: 要访问的页面路由信息
// from： 来自哪个页面的路由信息
// next: 放行的标记
// 路由导航
router.beforeEach((to, from, next)=> {
    if(to.meta.requiresAuth) { // 判断是否需要登录
        // 校验登录状态
        if (store.state.user) {
            return next() // 如果登录直接通过
        } else { // 提示是否登录
            Dialog.confirm({
                title: '访问提示',
                message: '该功能必须要登录才能访问',
            })
            .then(() => {// 点击确认执行的地方
                // on confirm
                router.replace({
                    name: 'login',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                })
            })
            .catch(() => { // 点击取消执行的地方
                // on cancel
                // 停止路由导航
                next(false)
            });
        }
    } else {
        // 不需要登录状态的直接通过
        next()
    }
})
export default router