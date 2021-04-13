<template>
  <div class="follow_item_contain">
        <van-cell center class="user-info">
                <div slot="title" class="name">{{follow.name}}</div>
            <van-image
                class="avatar"
                slot="icon"
                round
                :src="follow.photo"
                fit="cover"
            ></van-image>
            <div slot="label" class="pubdate">粉丝数：{{follow.fans_count}}</div>
            <van-button 
                class="follow-btn"
                round
                size="small"
                :type="follow.mutual_follow ? 'primary' : 'info'"
                @click="onFollow(follow.id)"
                :loading="isFollowLoading"
                >{{follow.mutual_follow ? '互相关注' : followUser ? '已关注' : '关注'}}</van-button>
        </van-cell>
  </div>
</template>

<script>
import { addFollow,deleteFollow } from '@/api/user'
export default {
    name: "followItemIndex",
    data() {
        return {
            isFollowLoading: false, //关注用户的按钮load状态
            followUser: true // 是否关注了用户
        }
    },
    props: {
        follow: {
            type: Object,
            required: true
        }
    },
    methods: {
        async onFollow(event) {
            //关注和取消关注
            this.isFollowLoading = true;
            if(this.followUser) {
                //已经关注,取消关注的操作
                await deleteFollow(event);
                // this.article.is_followed = false;
                this.followUser = !this.followUser;
            }else {
                //没有关注，关注的操作
                await addFollow(event);
                // this.article.is_followed = true;
                this.followUser = !this.followUser;
            }
            this.isFollowLoading = false;
            //更新视图
        }
    }
}
</script>

<style scoped lang="less">
.user-info {
    .avatar {
        width: 35px;
        height: 35px;
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
</style>