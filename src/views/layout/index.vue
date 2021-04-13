<template>
  <div class="layout-container">
        <!-- 也就是首页点击导航栏后四部分内容的显示地方：子路由出口 -->
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <!-- 底部导航栏 -->
        <van-tabbar v-model="active" route>
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="comment-o" to="/qa">热搜</van-tabbar-item>
            <!-- <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item> -->
            <van-tabbar-item icon="manager-o" to="/my">个人</van-tabbar-item>
        </van-tabbar>
  </div>
</template>

<script>
export default {
    name: "LayoutIndex",
    data() {
        return {
            active: 0,
        }
    },
    mounted() {
        // 添加页面的缓存
        this.$store.commit('addCachePage', 'LayoutIndex')
    }
}
</script>

<style lang="less" scoped>

</style>