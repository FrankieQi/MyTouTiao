<template>
  <div class="comment-reply">
      <!-- 头部信息 -->
      <van-nav-bar :title="`${comment.reply_count}条回复`">
        <van-icon
          slot="left"
          name="cross"
          @click="$emit('close')"
        ></van-icon>
      </van-nav-bar>
      <!-- /头部信息 -->
      <!-- 当前评论项 -->
        <comment-Item
            :comment="comment"
        ></comment-Item>
      <!-- /当前评论项 -->
      <!-- 所有评论回复 -->
        <van-cell title="所有回复"></van-cell>
      <!-- /所有评论回复 -->
        <comment-List
            :source="comment.com_id"
            type="c"
            :list="commentList"
        ></comment-List>
      <!-- 评论回复 -->
      <div class="article-bottom">
        <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
        >写评论</van-button>
      </div>
      <!-- /评论回复 -->
      <!-- 弹出层 -->
    <van-popup v-model="isPostShow" position="bottom" round>
        <post-comment 
            :target="comment.com_id" 
            :articleId="articleId"
            @post-success="onPostSuccess"
        ></post-comment>
    </van-popup>
  </div>
</template>

<script>
import commentItem from './comment-item'
import commentList from './comment-List'
import postComment from './post-comment'
export default {
    name: 'CommentReply',
    components: {
        commentItem,
        commentList,
        postComment
    },
    data() {
        return {
            isPostShow: false,
            commentList: [] // 评论的评论列表
        }
    },
    props: {
        comment: {
            type: Object,
            required: true
        },
        articleId: {
            type: [Number,String,Object],
            required: true
        }
    },
    methods: {
         onPostSuccess(comment) { // 父组件监听事件
            //发布成功后调用的函数
            // console.log(comment);
            this.commentList.unshift(comment);
            //关闭弹窗
            this.isPostShow = false;
            // 发布成功后更新评论的总数量
            this.comment.reply_count++;
        }
    }
}
</script>

<style scoped lang="less">
.article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
        width: 250px;
        height: 30px;
        margin: 0 auto;
        border: 2px solid #eeeeee;
        font-size: 15px;
        line-height: 23px;
        color: #a7a7a7;
    }
}
</style>