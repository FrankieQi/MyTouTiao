<template>
    <div class="search-result">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
        </van-list>
    </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import { mapState } from 'vuex'
export default {
    name: 'search-result',
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            page:1,
            perPage:10
        };
    },
    computed: {
        ...mapState(['user'])
    },
    props: {
        searchText: {
            type: String,
            required: true
        }
    },
    methods: {
        async onLoad() {
        //1.请求获取数据
            const { data } = await getSearchResult({
                page: this.page,  //页码
                key: this.searchText, //搜索的字符
                token: this.user.token
            });
        //2.数据放到列表中
            //  console.log(data)
            // const { results } = data.content;
            this.list.push(...data);
        //3.关闭本次的loading
            this.loading = false;
        //4.判断是否还有数据有则更新下一页
            if(data.length) {
                //如果有就更新下一页的数据
                this.page++
            }else {
                this.finished = true;//关闭加载更多
            }
        },
    },
}
</script>

<style scoped lang="less">
    .search-result {
        position: fixed;
        left: 0;
        right: 0;
        top: 54px;
        bottom: 0;
        overflow-y: auto;
    }
</style>