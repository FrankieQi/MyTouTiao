<template>
  <div class="user-follow">
        <van-nav-bar
            class="app-nav-bar"
            title="关注 / 粉丝"
            left-arrow
            @click-left="$router.push('/my')"
        />
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <!-- 底部导航栏 -->
        <van-tabbar v-model="active" route>
            <van-tabbar-item icon="home-o"  name="home" :to="followUrl">关注</van-tabbar-item>
            <van-tabbar-item icon="comment-o" name="fans" :to="fansUrl">粉丝</van-tabbar-item>
        </van-tabbar>
  </div>
</template>

<script>
export default {
    name: 'UserFollow',
    components: {

    },
    data() {
        return {
            active: 0,
            userId: 0,
            followUrl: '',
            fansUrl: ''
        }
    },
    mounted() {
        this.userId = this.$route.params.userId
        this.followUrl = `/follow/${this.userId}/follow`
        this.fansUrl = `/follow/${this.userId}/fans`
    },
    methods: {
    }
}
</script>

<style scoped lang="less">

</style>