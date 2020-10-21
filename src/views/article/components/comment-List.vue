<template>
    <div class="comment-list">
        <van-cell title="全部评论"></van-cell>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <comment-item
            v-for="(comment,index) in list" 
            :key="index" 
            :comment="comment"
        ></comment-item>
        <!-- <van-cell v-for="(comment,index) in list" :key="index" :title="comment.content" />-->
        </van-list>
        
    </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
    name: 'CommentList',
    components: {
        CommentItem
    },
    data() {
        return {
            // list: [],
            loading: false,
            finished: false,
            offset: null,
            limit: 10
        }
    },
    props: {
        source: {
            type: [Number,String,Object],
            required: true
        },
        list: {
            type: Array,
            default: ()=>[]
        }
    },
    methods: {
        async onLoad() {
        // 异步更新数据
            //1.请求获取数据
            //2.把数据放到列表中
            //3.把本次loading关闭
            //4.判断是否还有数据
            //      如果有，跟新获取下一页的页码
            //      如果没有，则把finished设置为true，不再触发加载更多
            const { data } = await getComments({
                type: 'a',
                source: this.source.toString(),
                offset: this.offset,
                limit: this.limit
            })
            const { results } = data.data;
            this.list.push(...results);
            this.loading = false;
            if(results.length) {
                this.offset = data.data.last_id;
            } else {
                this.finished = true;
            }
        },
    },
}
</script>

<style lang="less" scoped>

</style>