<template>
    <div class="post-comment">
        <van-field
            v-model.trim="message"
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
                :disabled="message === '' ? true : false"
                @click="onPost"
            >发布</van-button>
            <van-button 
                type="default" 
                size="small" 
                class="set-btn" 
                :disabled="message === '' ? true : false"
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
        // 希望父组件传递的参数
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
            this.$toast.loading({
                message: 'loading...',
                forbidClick: true //在toast出来的时候禁止点击
            })
            const { data } = await addComment({
                target: this.target.toString(),//评论的目标id（评论文章就是文章的id，对评论的回复就是评论的id）
                content: this.message,
                art_id: this.articleId ? this.articleId.toString() : null //文章的id，对文章评论的时候不要传这个id，对文章评论回复的时候要传
            })
            console.log(data);
            //处理响应结果
            //把数据显示到列表的顶部
            this.$emit('post-success',data.data.new_obj);//这么写的原因是这个子组件里无法取到评论列表数据和控制自身的是否弹出的
            this.$toast.success('发布成功');
            this.message = '';//发布成功后清空
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
        height: 20px;
        margin-bottom: 5px;
        margin-left: 15px;
        background-color: #57abff;
    }
</style>