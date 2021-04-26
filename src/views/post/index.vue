<template>
  <div class="post" v-if="postDetail.imgSrc">
    <van-nav-bar
      class="app-nav-bar"
      left-arrow
      fixed
      title="文章详情"
      @click-left="$router.back()"
    ></van-nav-bar>
    <img class="bannerImg" :src="imgBannerUrl" alt />
    <div class="mianContent">
        <div class="author">
            <img :src="avatarImg" alt="头像"  class="author_avatar"/>
            <span class="author_name">{{postDetail.author}}</span>
            <span>发布于</span>
            <span class="author_pubTime">{{postDetail.dateTime}}</span>
        </div>
        <div class="content">{{postDetail.content}}</div>
        <div class="tool">
            <div class="circle">
                <img 
                    :src="require('@/assets/images/icon/collection.png')"
                />
                <img 
                    class="share-img" 
                    :src="require('@/assets/images/icon/share.png')"
                />
            </div>
            <div class="horizon"></div>
        </div>
        <div class="title">{{postDetail.title}}</div>
        <div class="detail">{{postDetail.detail}}</div>
    </div>
  </div>
</template>

<script>
import { postList } from "@/assets/data/data";
export default {
  name: "PostIndex",
  created() {},
  mounted() {
      console.log(this.$route)
    let query = this.$route.params.postId;
    this.postId = query;
    this.postDetail = postList[this.postId];
    let img = this.postDetail.imgSrc
    let avatarImg = this.postDetail.avatar
    this.imgBannerUrl = require('@/assets/images' + img)
    this.avatarImg = require('@/assets/images'+avatarImg)

  },
  methods: {},
  data() {
    return {
      postId: 0,
      postList: postList,
      postDetail: {},
      imgBannerUrl: '',// banner图
      avatarImg:'', // 头像

    };
  },
};
</script>

<style scoped lang="less">
.post {
  .navBar {
      background-color: #3296fa !important;
  }
  .flex {
    //   position: fixed;
  }
  .mianContent {
        padding: 20px 10px 0px 10px;
        .title {
            font-weight: 600;
            font-size: 18px;
            text-align: center;
        }
        .content {
            font-size: 15px;
            text-indent: 30px;
        }
        .author {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #666;
            font-weight: 300;
            padding-bottom: 10px;
            .author_name {
                font-weight: 500;
                color: #000;
                margin-right: 10px;
            }
            .author_avatar {
                width: 35px;
                height: 35px;
                margin-right: 10px;
            }
            .author_pubTime {
                margin-left: 10px;
            }
        }
        .tool {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 15px 0;
            .circle {
                display: flex;
                width: 360px;
                /* 必须要有宽度才能实现靠拢的方向 */
                justify-content: flex-end;
                image {
                    width: 45px;
                    height: 45px;
                }
                .share-img {
                    margin-left: 20px;
                }
            }
            .horizon{
                width: 360px;
                height: 1px;
                background-color: #e5e5e5;
                position: absolute;
                z-index: -99;
            }
        }
        .detail {
            text-indent: 25px;
            color: #666;
            font-size: 15px;
            margin: 10px 10px;
            line-height: 20px;
            letter-spacing: 2px;
        }
    }
  .bannerImg {
      margin-top: 20px;
      width: 100%;
      height: 200px;
  }
  
}
</style>