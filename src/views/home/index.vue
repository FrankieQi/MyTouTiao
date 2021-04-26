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
                to="search"
            >搜索</van-button>
        </van-nav-bar>
        <!-- 导航栏结束 -->
        <van-tabs v-model="active" class="channel-tabs">
            <van-tab
                :title="channel.cname" 
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
        <keep-alive>
            <channel-edit 
                :active = "active"
                :recommend-channels="channels"
                v-on:close="isChannelEditShow = false"
                v-on:update-active="onUpdateActive"
            ></channel-edit>
        </keep-alive>
        
        </van-popup>
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import  ArticleList  from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/stroage'

export default {
    name: 'HomeIndex',
    components: {
        ArticleList,
        ChannelEdit
    },
    computed: {
        ...mapState(['user'])
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
            let channels = [];
            if(this.user) {
                //已经登录，请求获取线上的用户频道列表数据
                //请求获取频道数据
                const  data  = await getUserChannels();
                channels = data.data
            }else {
                //没有登录，判断是否有本地存储的列表数据
                const localChannels = getItem('channels');
                if(localChannels) {
                    channels = localChannels
                }else {
                    //用户没有登录也没有本地存储频道列表的情况
                    //有登陆和没有登录的接口都能够实现，但是返回的数据不同，通过是否有jwt来判断
                    const  data  = await getUserChannels();
                    channels = data.data
                }

            }
           
            // 一定要把变量给赋值回去
            this.channels = channels
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