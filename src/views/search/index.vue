<template>
  <div class="search_container">
      <!-- 导航栏 -->
      <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
      <form action="/">
        <van-search 
            v-model="searchText" 
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            background="#3296fa"
            @search="onSearch(searchText)"
            @cancel="$router.back()" 
            @focus="isResultShow=false"
        />
      </form>
        <!-- 搜索结果（特定的情况下出现） -->
        <search-result 
            :search-text="searchText"
            v-if="isResultShow"
            >
        </search-result>

        <!-- 联想记录（特定的情况下出现） -->
        <search-suggestion 
            v-else-if="searchText"
            :search-text="searchText"
            @search="onSearch"
        ></search-suggestion>

        <!-- 历史记录（特定的情况下出现） -->
        <search-history 
            v-else
            :search-histories="searchHistories"
            @search="onSearch"
            @update-histories = "searchHistories = $event"
            ></search-history>
  </div>
</template>

<script>
import searchSuggestion from './components/search-suggestion'
import searchHistory from './components/search-history'
import searchResult from './components/search-result'
import { setItem,getItem } from '@/utils/stroage'
import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'

export default {
    name: 'SearchIndex',
    components: {
        searchSuggestion,
        searchHistory,
        searchResult
    },
    computed: {
        ...mapState(['user'])
    },
    data() {
        return {
            searchText:'', //输入的搜索内容
            isResultShow: false, //控制搜索结果的显示状态
            searchHistories: getItem('search-histories') || []  //搜索历史记录
        }
    },
    created() {
        this.loadSearchHistories();
    },
    watch: {
        searchHistories () {
            setItem('search-histories',this.searchHistories);
        }
    },
    methods: {
        onSearch(searchText) {
            this.searchText = searchText;
            //数组去重的方法1（原始的）
            //indexOf返回的是查询到的索引号
            const index = this.searchHistories.indexOf(searchText);
            if( index !== -1) {
                //说明查到了相同的，就把数据删除掉
                this.searchHistories.splice(index,1);
            }
            //触发搜索记录搜索历史记录
            this.searchHistories.unshift(searchText);

            //数据持久化，这里要注意如果登录了后端会自动把搜索记录存入
            //没有登录就存本地，但是这里登录了也存本地
            setItem('search-histories',this.searchHistories);
            //搜索的时候触发的事件
            this.isResultShow =true;//搜索结果的展示
        },
        async loadSearchHistories() {
            //登录的情况下获取线上历史记录+本地历史
            let searchHistories = getItem('search-histories') || [];
            if(this.user){//登录的情况下
                const { data } = await getSearchHistories();
                //data为线上返回的搜索记录
                searchHistories = [...new Set([
                    ...searchHistories,
                    ...data.data.keywords
                ])]
            }
            this.searchHistories = searchHistories
        }
    }

}
</script>

<style scoped lang="less">
    .search_container {
        font-size: 18px;
    }
</style>