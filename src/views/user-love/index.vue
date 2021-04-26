<template>
  <div class="userLove">
    <van-nav-bar
      fixed
      class="app-nav-bar"
      title="收藏 / 历史"
      left-arrow
      @click-left="$router.push('/my')"
    />
    <van-tabs 
      v-model="activeName" 
      color="#3296fa" 
      background="#f3f3f3" 
      class="main_contain"
    >
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
import { mapState } from 'vuex'
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
    computed: {
        ...mapState(['user'])
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
        let  data  = await getUserCollectList({
          token: this.user.token
        })
        console.log(data)
        const result = data.data
        let arr = []
        for(let i in result) {
          arr.push(result[i])
        }
        console.log(arr)
        // this.collectList.push(...result)
        this.collectList = arr
        this.loading = false
        if(result.length == data.data.length) {
            this.finished = true;
        } else {
            //没有数据了，不能触发加载更多了
            // this.finished = true;
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
.main_contain {
  margin-top: 40px;
}
</style>