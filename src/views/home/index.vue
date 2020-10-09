<template>
    <div class="home-container">
        <!-- 导航栏 -->
        <van-nav-bar class="app-nav-bar">
            <van-button
                slot="title"
                class="search-btn"
                icon="search"
                type="info"
                round
                size="small"
            >搜索</van-button>
        </van-nav-bar>
        <!-- 导航栏 -->
        <van-tabs v-model="active">
            <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">内容 1</van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
export default {
    name: 'HomeIndex',
    data() {
        return {
            active:0, //控制被激活的标签
            channels: [] //频道列表
        }
    },
    created() {
        this.loadChanels();
    },
    methods: {
        async loadChanels() {
            //请求获取频道数据
            const { data } = await getUserChannels();
            // console.log(data);
            this.channels = data.data.channels
        }
    }
}
</script>

<style lang="less" scoped>
.home-container {
    /deep/.van-nav-bar__title {
        max-width: none;
    }
    .search-btn {
        width: 277px;
        height: 32px;
        background-color: #5babfb;
        border: none;
    }
}
</style>