<template>
    <van-cell class="comment-item" >
        <van-image 
        slot="icon"
        width="36" 
        height="36"  
        round 
        class="avatar"
        :src="comment.user_info.avatar"
        fix="cover" />
        <div slot="title" class="title-wrap">
            <div class="title-wrap-top">
                <div class="user-name">{{comment.user_info.username}}</div>
                <div class="like-wrap">
                    <van-icon class="like-icon" 
                        :name="comment.upvote_status == 1 ? 'like' : 'like-o'"
                        color="hotpink"
                        @click="onCommentLike"
                         />
                    <span class="like-count">{{comment.upvote}}</span>
                </div>
            </div>
            <div class="content" slot="label">{{comment.content}}
            </div>
            <div class="bottom-wrap">
                <span class="pubdate">{{ comment.create_time | dateTime}}</span>
                <!-- <van-button
                    round
                    class="reply-btn"
                    type="info"
                    size="mini"
                    @click="$emit('reply-click', comment)"
                >{{comment.like_count}}回复</van-button> -->
            </div>
        </div>
        
    </van-cell>
</template>

<script>
import { addCommentLike,deleteCommentLike } from '@/api/comment'
import { mapState } from 'vuex'
export default {
    name:'CommentItem',
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        async onCommentLike() {
            // const commentId = this.comment.com_id.toString();
            if(this.comment.upvote_status == 1) {
                //已经喜欢的情况，再点就取消喜欢
                await deleteCommentLike({
                    news_id: this.comment.news_id,
                    discuss_id: this.comment.id,
                    token: this.$store.state.user.token
                });
                this.comment.reply_count--;
                this.comment.upvote_status = 0
            } else {
                await addCommentLike({
                    news_id: this.comment.news_id,
                    discuss_id: this.comment.id,
                    token: this.$store.state.user.token
                });
                this.comment.upvote++;
                this.comment.upvote_status = 1
            }
            this.$toast.success({
                icon: `${this.comment.upvote_status == 1 ? 'like' : 'like-o'}`,
                message:`${this.comment.upvote_status == 1 ? '添加喜欢' : '取消喜欢'}`,
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