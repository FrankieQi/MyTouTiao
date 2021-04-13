<template>
  <div class="article-list" ref="article-list">
      <van-pull-refresh v-model="isRefreshLoading" 
        @refresh="onRefresh"
        :success-text="refreshSuccessText"
        :success-duration="1500">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <article-item 
                v-for="(article,index) in articles" :key="index" :article="article"
            />
            <!-- <van-cell v-for="(article,index) in articles" 
                      :key="index" 
                      :title="article.title"
                      /> -->
        </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
import { debounce } from 'lodash'
export default {
    name: 'ArticleList',
    props: {
        channel: {
            type: Object,
            required: true
        }
    },
    components: {
        ArticleItem
    },
    data() {
        return {
            articles: [],
            loading: false,
            finished: false,
            timestamp: null, //获取下一页数据的时间戳
            isRefreshLoading: false, //下拉刷新的loading状态，为true的时候就是在加载中
            refreshSuccessText:'', //下拉刷新成功提示
            scrollTop: 0 // 卷去的距离
        }
    },
    methods: {
        async onLoad() {
            // 异步更新数据
            //1.请求获取数据
            const { data } = await getArticles({
                channel_id: this.channel.id, //频道ID
                timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐
                //传指定的时间戳，timestamp 相当于页码，请求最新数据使用当前最新时间戳，下一页数据使用上一次返回的数据中的时间戳
                with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
            })
            //2. 把数据放到数组中
            const { results } = data.data
            this.articles.push(...results);
            //3. 设置本次加载状态全部结束，它才可以判断是否需要加载下一次，否则就会永远停在这里
            this.loading = false;
            //4. 数据全部加载完成
            if(results.length) {
                //获取下一页的数据
                this.timestamp = data.data.pre_timestamp;
            } else {
                //没有数据了，不能触发加载更多了
                this.finished = true;
            }
        },
        async onRefresh() {
            // 下拉刷新，组件自己就会展示 loading 状态
            // 1. 请求获取数据
            const { data } = await getArticles({
                channel_id: this.channel.id, // 频道 ID
                timestamp: Date.now(), // 为了大家方便学习，只要你传递不同的时间戳就一定给你返回不一样的数据，而且数据不为空
                with_top: 1
            })
            // 2. 把数据放到数据列表中（往顶部追加）
            const { results } = data.data
            this.articles.unshift(...results)
            // 3. 关闭刷新状态,说明成功了
            this.isRefreshLoading = false;
            // 4. 提示成功
            this.refreshSuccessText = "刷新成功"
        }
    },
    mounted() {
        const articleList = this.$refs['article-list']
        articleList.onscroll = debounce(() => {
            this.scrollTop = articleList.scrollTop
        }, 50)
    },
    activated() {
        // console.log('from cache')
        this.$refs['article-list'].scrollTop = this.scrollTop
    }
}
</script>

<style scoped lang="less">
    .article-list {
        position: fixed;
        left: 0;
        right: 0;
        top: 90px;
        bottom: 50px;
        overflow-y: auto;
    }
</style>