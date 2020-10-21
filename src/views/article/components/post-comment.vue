<template>
    <div class="post-comment">
        <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
        />
        <div class="all-btn">
            <van-button 
                type="default" 
                size="small" 
                class="post-btn" 
                round
                @click="onPost"
            >发布</van-button>
            <van-button 
                type="default" 
                size="small" 
                class="set-btn" 
                round
                @click="onSet"
            >重置</van-button>
        </div>
        
    </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
    name:'PostComment',
    data() {
        return {
            message:''
        }
    },
    props: {
        target: {
            type: [Number,String,Object],
            required: true
        },
        articleId: {
            type: [Number,String,Object],
            default: null //说明没有传值的时候默认就是null，传了值就是传的数据
        }
    },
    methods: {
        async onPost() {
            //找到数据接口
            //封装请求方法
            //提交数据
            const { data } = await addComment({
                target: this.target.toString(),//评论的目标id（评论文章就是文章的id，对评论的回复就是评论的id）
                content: this.message,
                art_id: this.articleId ? this.articleId.toString() : null //文章的id，对文章评论的时候不要传这个id，对文章评论回复的时候要传
            })
            //处理响应结果
            //把数据显示到列表的顶部
            this.$emit('post-success',data.data.new_obj)
            //关闭弹出层
        },
        onSet() {
            this.message = '';
        }
    }
}
</script>

<style lang="less" scoped>
    .post-comment {
        padding: 14px;
        display: flex;
        align-items: center;
    }
    .post-btn,.set-btn {
        width: 50px;
        margin-bottom: 5px;
        margin-left: 15px;
        background-color: #f5f5f5;
    }
</style>