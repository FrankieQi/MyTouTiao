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
        <!-- 导航栏结束 -->
        <van-tabs v-model="active" class="channel-tabs">
            <van-tab
                :title="channel.name" 
                v-for="channel in channels" 
                :key="channel.id"
            >
            <!-- 文章列表 -->
            <article-list :channel = "channel"/>
            </van-tab>
            <div slot="nav-right" class="emptyDiv"></div>
            <div slot="nav-right">
                <van-icon 
                    name="bars"
                    @click="isChannelEditShow=true"
                    class="wap-nav-wrap"
                />
            </div>
        </van-tabs>
        <van-popup
            v-model="isChannelEditShow"
            class="channel-edit-popup"
            position="bottom"
            closeable
            round
            get-container="body"
            style="height:70%"
        >
        <!-- 频道编辑内容 -->
        <channel-edit 
            :active = "active"
            :user-channels="channels"
            v-on:close="isChannelEditShow = false"
            v-on:update-active="onUpdateActive"
            ></channel-edit>
        </van-popup>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import  ArticleList  from './components/article-list'
import ChannelEdit from './components/channel-edit'

export default {
    name: 'HomeIndex',
    components: {
        ArticleList,
        ChannelEdit
    },
    data() {
        return {
            active:0, //控制被激活的标签
            channels: [], //频道列表
            isChannelEditShow: false //控制编辑频道的显示状态
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
        },
        onUpdateActive(index) {
            // console.log(index);
            this.active = index;
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
    .channel-tabs {
        /deep/ .van-tabs__line {
            // border-right: 1px solid #ccc;
            background-color: #5babfb !important;
            width: 35px;
        }
    }
    .wap-nav-wrap {
        position: fixed;
        right: 0;
        height: 44px;
        line-height: 44px;
        margin-right: 5px;
        font-size: 18px;
        background-color: transparent;
    }
    .emptyDiv {
        width: 20px;
        height: 44px;
        flex-shrink: 0;
    }
}
</style>