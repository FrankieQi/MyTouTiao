<template>
    <van-cell class="comment-item" >
        <van-image 
        slot="icon"
        width="36" 
        height="36"  
        round 
        class="avatar"
        :src="comment.aut_photo"
        fix="cover" />
        <div slot="title" class="title-wrap">
            <div class="title-wrap-top">
                <div class="user-name">{{comment.aut_name}}</div>
                <div class="like-wrap">
                    <van-icon class="like-icon" 
                        :name="comment.is_liking ? 'like' : 'like-o'"
                        color="hotpink"
                        @click="onCommentLike"
                         />
                    <span class="like-count">{{comment.reply_count}}</span>
                </div>
            </div>
            <div class="content" slot="label">{{comment.content}}
            </div>
            <div class="bottom-wrap">
                <span class="pubdate">{{ comment.pubdate | dateTime}}</span>
                <van-button
                    round
                    class="reply-btn"
                    type="info"
                    size="mini"
                >{{comment.like_count}}回复</van-button>
            </div>
        </div>
        
    </van-cell>
</template>

<script>
import { addCommentLike,deleteCommentLike } from '@/api/comment'
export default {
    name:'CommentItem',
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    methods: {
        async onCommentLike() {
            const commentId = this.comment.com_id.toString();
            if(this.comment.is_liking) {
                //已经喜欢的情况，再点就取消喜欢
                await deleteCommentLike(commentId);
                this.comment.reply_count--;
            } else {
                await addCommentLike(commentId);
                this.comment.reply_count++;
            }
            this.comment.is_liking = !this.comment.is_liking;
            this.$toast.success({
                icon: `${this.comment.is_liking ? 'like' : 'like-o'}`,
                message:`${this.comment.is_liking ? '添加喜欢' : '取消喜欢'}`,
                duration: 1000
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .comment-item {
        .avatar {
            width: 36px;
            height: 36px;
            margin-right: 13px;
        }
        .name {
            font-size: 14px;
            color: #406599;
        }
        .content {
            font-size: 16px;
            color: #222;
        }
        .pubdate {
            font-size: 10px;

        }
        .reply-btn {
            width: 45px;
            height: 18px;
        }
        .title-wrap-top {
            display: flex;
            justify-content: space-between;
        }
        .like-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .like-icon {
            margin-right: 3px;
        }
        .bottom-wrap {
            display: flex;
            justify-content: space-between;
        }
    }
</style>