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
    <h1 class="title">{{article.title}}</h1>
    <van-cell center class="user-info">
        <div slot="title" class="name">{{article.aut_name}}</div>
        <van-image
            class="avatar"
            slot="icon"
            round
            :src="article.aut_photo"
            fit="cover"
        ></van-image>
        <div slot="label" class="pubdate">{{article.pubdate | relativeTime}}</div>
        <van-button 
            class="follow-btn"
            round
            :icon="article.is_followed ? '' : 'plus'"
            size="small"
            :type="article.is_followed ? 'primary' : 'info'"
            >{{article.is_followed ? '已关注' : '关注'}}</van-button>
    </van-cell>
    <div class="markdown-body" v-html="article.content" ref="article_content">
    </div>
  </div>
</template>

<script>
import './markdown-css.css'
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant';


export default {
    name: 'ArticleIndex',
    components: {},
    props: {
        articleId: {
        type: [Number, String ,Object],
        required: true
        }
    },
    data () {
        return {
            article:{} //文章的数据对象
        }
    },
    computed: {},
    watch: {},
    created () {
        this.loadArticle();
    },
    mounted () {},
    methods: {
        async loadArticle() {
            const { data } = await getArticleById(this.articleId);
            // console.log(data)
            this.article = data.data;
            //获取所有的img
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
.markdown-body {
    padding: 14px;
    background-color: #fff;
}
</style>