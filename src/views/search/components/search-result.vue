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
                per_page: this.perPage, //每一页的大小
                q: this.searchText //搜索的字符
            });
        //2.数据放到列表中
            const { results } = data.data;
            this.list.push(...results);
        //3.关闭本次的loading
            this.loading = false;
        //4.判断是否还有数据有则更新下一页
            if(results.length) {
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