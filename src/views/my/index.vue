<template>
  <div class="my-container">
    <van-cell-group class="my-info" v-if="user">
      <van-cell
        class="base-info"
        center
        :border="false"
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.avatar"
          @click="goToUserInfo(currentUser.id)"
        />
        <div class="name" slot="title">{{currentUser.username}}</div>
        <van-button
          class="update-btn"
          size="small"
          round
          to="/user/profile"
        >编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count" v-text="20"></div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap" @click="goToFollow(currentUser.id)">
            <div class="count">{{collectNum}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap" @click="goToFans(currentUser.id)">
            <div class="count">{{fansNum}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count"  v-text="5">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div class="not-login" @click="$router.push('/login')" v-else>
      <div>
        <img class="mobile" src="./手机.png">
      </div>
      <div class="text">登录</div>
    </div>

    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
        :to="{ name: 'user-love',params:{ type: 0}}"
      />
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
        :to="{ name: 'user-love',params:{ type: 1}}"
      />
    </van-grid>

    <van-cell title="消息通知" class="mb-4" is-link to="/" />
    <van-cell class="mb-4" title="小方同学" is-link to="/user/chat" />
    <van-cell class="mb-4" title="生成QrCode" is-link to="/qrCode" />
    <van-cell class="mb-4" title="注册用户" is-link to="/register" />
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser,getUserLikeNum,getUserFollowList } from '@/api/user'
export default {
  name: 'MyIndex',
  created() {
      
  },
  data () {
    return {
        currentUser: {}, // 当前登录用户信息
        history: 1,
        fansNum: 0,
        collectNum: ''
    }
  },
  computed: {
      ...mapState(['user'])
  },
  activated() {
    this.loadCurrentUser()
  },
  methods: {
      onLogout () {
        // 提示用户确认退出
        // 确认 -> 处理退出
        this.$dialog.confirm({
            title: '退出提示',
            message: '确认退出吗？'
        }).then(() => { // 确认按钮执行这里
            // 清除用户登录状态
            this.$store.commit('setUser', null)
        }).catch(() => { // 退出按钮执行这里
            // on cancel
        })
    },
    async loadCurrentUser () {
      const { data } = await getCurrentUser();
      this.currentUser = data
      const res = await getUserLikeNum()
      this.fansNum = res.data.sum 
      const collectNum = await getUserFollowList()
      this.collectNum = collectNum.data.length
      let userMsg = {}
      userMsg.collectNum = this.collectNum
      userMsg.fansNum = this.fansNum
      let a = JSON.stringify(userMsg) // 转成json字符串才可以取出来
      localStorage.setItem('userMsg', a)
    },
    goToUserInfo(event) {
      this.$router.push(`/user/${event}`)
    },
    goToFollow(event) {
      this.$router.push(`/follow/${event}/follow`)
    },
    goToFans(event) {
      this.$router.push(`/follow/${event}/fans`)
    },
    goToResgrister() {
      this.$router.push(`/login`)
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }

  .not-login {
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
      margin-top: 5px;
      margin-left: -2px;
    }
  }

  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>