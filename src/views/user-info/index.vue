<template>
  <div class="user_info_container">
      <van-nav-bar
            class="app-nav-bar"
            :title="userInfo.name"
            left-arrow
            @click-left="$router.back()"
        />
        <div class="topContain">
            <div class="topContain_main">
                <div>
                    <img :src="userInfo.avatar" alt="" class="avatar">
                </div>
                <div class="topContain_right">
                    <van-grid 
                        :gutter="12" 
                        :column-num="4"
                        :border="false"
                        class="data-info"
                    >
                        <van-grid-item class="data-info-item">
                            <div slot="text" class="text-wrap">
                                <div class="count" v-text="20">{{userInfo.art_count}}</div>
                                <div class="text">头条</div>
                            </div>
                        </van-grid-item>
                        <van-grid-item class="data-info-item">
                            <div slot="text" class="text-wrap">
                                <div class="count">{{collectNum}}</div>
                                <div class="text">关注</div>
                            </div>
                        </van-grid-item>
                        <van-grid-item class="data-info-item">
                            <div slot="text" class="text-wrap">
                                <div class="count">{{fansNum}}</div>
                                <div class="text">粉丝</div>
                            </div>
                        </van-grid-item>
                        <van-grid-item class="data-info-item">
                            <div class="text-wrap" slot="text">
                                <div class="count" v-text="5">{{userInfo.like_count}}</div>
                                <div class="text" >获赞</div>
                            </div>
                        </van-grid-item>
                    </van-grid>
                </div>
            </div>
            <div class="intro">简介：{{userInfo.introduction == '' ? '无' : userInfo.introduction}}</div>
        </div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
            <publish-item 
                v-for="(userArticle,index) in userArticleInfo" 
                :key="index" 
                :userPublishItem="userArticle"
            ></publish-item>
        </van-list>
  </div>
</template>

<script>
import  PublishItem  from '@/components/publish_item/index'
import { getCurrentUser,getUserArticleList } from '@/api/user'
export default {
    name: 'userInfo',
    components: {
        PublishItem
    },
    data() {
        return {
            userId: 0, // 用户ID
            userInfo: {}, // 用户信息
            page: 1,
            per_page: 10, 
            userArticleInfo: [], // 用户个人文章信息
            loading: false, // 加载状态
            finished: false,
            collectNum: '',
            fansNum: ''
        }
    },
    mounted() {
        // console.log(this.$route.params.userId)
        this.userId = this.$route.params.userId
        let Msg = localStorage.getItem('userMsg')
        let userMsg = JSON.parse(Msg)
        console.log(userMsg.collectNum)
        this.collectNum = userMsg.collectNum
        this.fansNum = userMsg.fansNum
    },
    methods: {
        async onLoad() {
            let res = await getCurrentUser();
            console.log(res)
            this.userInfo = res.data
            let { data } = await getUserArticleList({
                page: this.page,  //页码
                per_page: this.per_page, //每一页的大小
            })
            const result = data.data.results
            this.userArticleInfo.push(...result) 
            // 加载状态结束
            this.loading = false
            if(result.length) {
                this.page++
            } else {
                //没有数据了，不能触发加载更多了
                this.finished = true;
            }
            // console.log('触发')
            // this.$toast.success({
            //     message:'查询成功',
            //     forbidClick: true // 禁止背景点击
            // })
        }
    },
}
</script>

<style scoped lang="less">
.topContain {
    // height: 120px;
    background: #fff;
    padding: 10px;
    .topContain_main {
        display: flex;
        align-items: center;
        .avatar {
            width: 50px;
            height: 50px;
            // background: pink;
            border-radius: 50%;
        }
        .topContain_right {
            flex: 1
        }
        .data-info {
            .data-info-item {
                height: 65px;
                // color: #fff;
                .text-wrap {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .count {
                    font-size: 15px;
                    font-style: italic;
                    color: #666;
                }
                .text {
                    font-size: 10px;
                    color: rgb(163, 160, 160);
                }
                }
            }
        }
        .intro {
            flex-shrink: unset;
        }
    }
    .intro {
        font-size: 13px;
    }
}
</style>