<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      left-arrow
      title="文章详情"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->
    <div class="article-wrap">
        <h1 class="title">{{article.title}}</h1>
        <van-cell center class="user-info">
            <div slot="title" class="name">{{article.author}}</div>
            <van-image
                class="avatar"
                slot="icon"
                round
                :src="article.image_url"
                fit="cover"
            ></van-image>
            <div slot="label" class="pubdate">{{article.update_time | relativeTime}}</div>
            <van-button 
                class="follow-btn"
                round
                :icon="article.follow_status == 1 ? '' : 'plus'"
                size="small"
                :type="article.follow_status == 1 ? 'primary' : 'info'"
                @click="onFollow"
                :loading="isFollowLoading"
                >{{article.follow_status == 1 ? '已关注' : '关注'}}</van-button>
        </van-cell>
        <div class="markdown-body" v-html="article.content" ref="article_content">
        </div>
        <!-- 评论区 -->
        <comment-list
            :source="articleId"
            :list="commentList"
            @update-total-count="totalCommentCount = $event"    
            @reply-click="onReplyClick"
        ></comment-list>
        <!-- /评论区 -->
    </div>
    <!-- 底部区域 -->
    <van-popup v-model="isPostShow" position="bottom" round>
        <post-comment 
          :target="articleId" 
          :articleId="articleId"
          @post-success="onPostSuccess"
        ></post-comment>
    </van-popup>
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        :info="totalCommentCount"
        color="#777"
      />
      <van-icon
        color="yellow"
        :name="article.collect_status == 1 ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        color="red"
        :name="article.upvote_status === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
      <van-icon name="share" color="#777777"></van-icon>
      
    </div>
    <!-- /底部区域 -->
    <!-- 评论回复 v-if是条件渲染功能-->
    <van-popup v-model="isReplyShow" position="bottom" round>
        <reply-comment 
            v-if="isReplyShow"
            :comment="commentReply"
            @close="isReplyShow = false"
            :articleId="articleId"
        ></reply-comment>
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import './markdown-css.css'
import CommentList from './components/comment-List'
import postComment from './components/post-comment'
import replyComment from './components/comment-reply'
import { addCollect,deleteCollect,getArticleById,deleteLike,addLike } from '@/api/article'
import { ImagePreview } from 'vant';
import { addFollow,deleteFollow } from '@/api/user'
import { mapState } from 'vuex'
import { getComments } from '@/api/comment'
export default {
    name: 'ArticleIndex',
    components: {
        CommentList,
        postComment,
        replyComment

    },
    props: {
        // articleId: {
        //     type: [Number, String ,Object],
        //     required: true
        // }
    },
    computed: {
        ...mapState(['user'])
    },
    data () {
        return {
            articleId: this.$route.params.news_id,
            article:{}, //文章的数据对象
            isFollowLoading: false,//关注用户的按钮load状态
            isPostShow: false,
            commentList: [], //文章评论列表,数据的来源是子组件，这里是对组件数据进行操作
            totalCommentCount: 0, // 评论总数量
            isReplyShow: false, // 控制回复的显示状态
            commentReply: {}
        }
    },
    watch: {},
    created () {
        this.articleId = this.$route.params.news_id
        // this.articleId = this.articleId.toString();
        this.loadArticle();
    },
    mounted () {
        console.log(this.$route.params)
    },
    methods: {
        async loadArticle() {
            const data  = await getArticleById({
                news_id: this.articleId
            });
            // console.log(data)
            this.article = data.data;
            //获取所有的img,要在操作完数据马上拿到必须写在这里面
            this.$nextTick(() => {
                this.handlePreviewImage();
            })

        },
        handlePreviewImage() {
            //vue中获取dom的方法：ref
            const articleContent = this.$refs.article_content;
            const imgs = articleContent.querySelectorAll('img');
            const imgUrls = []; //所有图片路径
            // console.log(imgs)
            imgs.forEach((img,index) => {
                imgUrls.push(img.src);
                img.onclick=function() {
                    ImagePreview({
                        images:imgUrls,
                        startPosition: index
                    });
                }
            });
        },
        async onFollow() {
            //关注和取消关注
            this.isFollowLoading = true;
            if(this.article.follow_status == 1) {
                //已经关注,取消关注的操作
                await deleteFollow(this.article.uid);
                this.article.follow_status = 0;
            }else {
                //没有关注，关注的操作
                await addFollow(this.article.uid);
                this.article.follow_status = 1;
            }
            this.isFollowLoading = false;
            //更新视图
            // this.article.is_followed = !this.article.is_followed;
            this.$toast.success({
                message:`${this.article.follow_status == 1 ? '关注成功' : '取消关注'}`,
                duration: 1000
            })
        },
        async onCollect() {
            this.$toast.loading({
                message:'Loading...',
                forbidClick: true
            })
            //收藏和取消收藏
            if(this.article.collect_status == 1) {
                //已经收藏,取消关注的操作
                await deleteCollect({
                    news_id: this.articleId,
                    token: this.user.token
                });
                this.article.collect_status = 0
            }else {
                //没有收藏，关注的操作
                await addCollect({
                    news_id: this.articleId,
                    token: this.user.token
                });
                this.article.collect_status = 1
            }
            //更新视图
            // this.article.is_collected = !this.article.is_collected;
            this.$toast.success({
                message:`${this.article.collect_status == 1 ? '收藏成功' : '取消收藏'}`,
                duration: 1000
            })
        },
        async onLike() {
            this.$toast.loading({
                message:'Loading...',
                forbidClick: true
            })
            //点赞和取消点赞
            if(this.article.upvote_status === 1) {
                //已经点赞,取消点赞的操作
                await deleteLike({
                    news_id: this.articleId,
                    token: this.user.token
                });
                this.article.upvote_status = 0;
            }else {
                //没有点赞，点赞的操作
                await addLike({
                    news_id: this.articleId,
                    token: this.user.token
                });
                this.article.upvote_status = 1;
            }
            //更新视图
            this.$toast.success({
                message:`${this.article.upvote_status === 1 ? '添加喜欢' : '取消喜欢'}`,
                duration: 1000
            })
        },
        async onPostSuccess(comment) { // 父组件监听事件
            //发布成功后调用的函数
            // console.log(comment);
            // this.commentList.unshift(comment);
            const  data  = await getComments({
                news_id: comment
            })
            // console.log(data, 123456)
            this.commentList = data.data
            //关闭弹窗
            this.isPostShow = false;
            // 发布成功后更新评论的总数量
            this.totalCommentCount++;
        },
        onReplyClick(comment) {
            // console.log(comment)
            this.commentReply = comment;
            this.isReplyShow = true;
        }
    }
}
</script>

<style scoped lang="less">
.article-container {
    .title {
        font-size: 20px;
        color:#3a3a3a;
        padding: 14px;
        background-color: #fff;
        margin: 0;
    }
    .user-info {
        .avatar {
            width: 35px;
            height: 35px;
            margin-right: 8px;
        }
        .name {
            font-size: 18px;
            color: #333;
        }
        .pubdate {
            font-size: 12px;
            color: #ccc
        }
        .follow-btn {
            width: 80px;
            height: 27px;
        }
    }
}
ul {
    list-style: unset;
}
.article-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 44px;
    overflow-y: auto;
}
.markdown-body {
    padding: 14px;
    background-color: #fff;
}
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
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .follow_icon {
        color: yellow!important;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 11px;
        background-color: #e22829;
      }
    }
  }
</style>