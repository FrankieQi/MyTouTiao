<template>
  <div class="userLove">
    <van-nav-bar
      class="app-nav-bar"
      title="收藏 / 历史"
      left-arrow
      @click-left="$router.back()"
    />
    <van-tabs v-model="activeName" color="#3296fa" sticky background="#f3f3f3" >
      <van-tab title="收藏" name="collect">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <collect-item
            :collects="collectList"
          ></collect-item>
        </van-list>
      </van-tab>
      <van-tab title="历史" name="history">
        <van-list
            v-model="loadingHistory"
            :finished="finishedHistory"
            finished-text="没有更多了"
            @load="onLoadHistory"
        >
          <history-item :hostories="historyList"></history-item>
        </van-list>
      </van-tab> 
    </van-tabs>
  </div>
</template>

<script>
import CollectItem from './components/collection'
import HistoryItem from './components/history'
import { getUserCollectList,getUserHistoryList } from '@/api/user'
export default {
    name: 'UserLoveIndex',
    components: {
      CollectItem,
      HistoryItem
    },
    data() {
        return {
            activeName: 'collect',
            page: 1,
            per_page: 10,
            collectList: [], // 用户收藏列表
            loading: false, // 加载状态
            finished: false,
            loadingHistory: false, 
            finishedHistory: false, // 完成加载历史记录
            pageHistory: 1,
            per_page_History: 10,
            historyList: [] // 用户历史阅读
        }
    },
    mounted() {
      if (this.$route.params.type === 0) {
        // 收藏
        this.activeName = 'collect'
      } else {
        // 历史
        this.activeName = 'history'
      }
    },
    methods: {
      async onLoad() {
        let { data } = await getUserCollectList({
          page: this.page,
          per_page: this.per_page
        })
        const result = data.data.results
        this.collectList.push(...result) 
        this.loading = false
        if(result.length) {
            this.page++
        } else {
            //没有数据了，不能触发加载更多了
            this.finished = true;
        }
        console.log('触发收藏')
      },
      async onLoadHistory() {
        console.log('触发历史')
        let { data } = await getUserHistoryList({
          page: this.pageHistory,
          per_page: this.per_page_History
        })
        const result = data.data.results
        this.historyList.push(...result) 
        this.loading = false
        if(result.length) {
            this.pageHistory++
        } else {
            //没有数据了，不能触发加载更多了
            this.finished = true;
        }
        console.log(this.historyList)
      }
    },
}
</script>

<style>

</style>