<template>
  <div class="publish_item">
     <van-cell center class="user-info">
        <div slot="title" class="name">{{userPublishItem.aut_name}}</div>
        <van-image
            class="avatar"
            slot="icon"
            round
            :src="require('@/assets/images/avatar/3.jpg')"
            fit="cover"
        ></van-image>
        <div slot="label" class="pubdate">{{userPublishItem.pubdate | relativeTime}}</div>
    </van-cell>
    <van-cell>
        <div>
            {{userPublishItem.title}}
        </div>
        <div slot="label">
            <div
                v-if="userPublishItem.cover.type === 3"
                class="cover-wrap"
            >
                <div
                class="cover-wrap-item"
                v-for="(img, index) in userPublishItem.cover.images"
                :key="index"
                >
                <van-image
                    class="cover-image"
                    fit="cover"
                    :src="img"
                />
                </div>
            </div>
    </div>
    <!-- 默认插槽的名字叫 default，可以省略 -->
    <van-image
      v-if="userPublishItem.cover.type === 1"
      class="right-cover"
      fit="cover"
      :src="userPublishItem.cover.images[0]"
    />
    </van-cell>
    <van-grid 
        direction="horizontal" 
        :column-num="3"
        icon-size="26"
        :border="false"
    >
        <van-grid-item icon="comment-o" :text="String(userPublishItem.comm_count)" />
        <van-grid-item icon="star-o" :text="String(userPublishItem.collect_count)" />
        <van-grid-item icon="good-job-o" :text="String(userPublishItem.like_count)" />
    </van-grid>
  </div>
</template>

<script>
export default {
    name: 'PublishItem',
    data() {
        return {
            
        }
    },
    props: {
        userPublishItem: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="less">
.publish_item {
    margin: 10px 0;
    .user-info {
        height: 60px;
        .avatar {
            width: 40px;
            height: 40px;
            margin-right: 8px;
        }
        .name {
            font-size: 16px;
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
    .right-cover {
    width: 116px;
    height: 73px;
  }
  .cover-wrap {
    padding: 15px 0;
    display: flex;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-image {
        width: 100%;
        height: 73px;
      }
    }
  }
}
</style>