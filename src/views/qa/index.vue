<template>
    <div class="qa-container">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item >
                <img 
                    :src="require('@/assets/images/cover/jumpfly.jpg')" 
                    class="img"
                    @click="goToPost(4)"    
                >
            </van-swipe-item>
            <van-swipe-item>
                <img 
                :src="require('@/assets/images/cover/bestplayers.jpg')"
                class="img"
                @click="goToPost(3)"
                >
            </van-swipe-item>
            <van-swipe-item>
                <img 
                    :src="require('@/assets/images/cover/lpl.jpg')" 
                    class="img"
                    @click="goToPost(0)"
                >
            </van-swipe-item>
            <van-swipe-item>
                <img 
                    :src="require('@/assets/images/post/cat.png')" 
                    class="img"
                    @click="goToPost()"
                >
            </van-swipe-item>
        </van-swipe>
        <van-notice-bar
            left-icon="volume-o"
            text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
        />
        <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
        >   
            <!-- <van-cell title="单元格" icon="fire">
                <van-icon name="fire" />
            </van-cell> -->
            <!-- <van-cell 
                v-for="item in list" 
                :key="item.postId" 
                :title="item.postId+1+'   ' + item.title" 
            >
                <van-icon v-if="item.postId <= 2" name="fire" color="red"/>
            </van-cell> -->
            <div v-for="item in list" :key="item.postId" class="list" @click="goToPost(item.postId)">
                <span :class="item.postId < 3 ? 'num': 'normal'">{{item.postId+1}}.&nbsp;</span>
                <span>{{item.title}}</span>
                <van-icon 
                    v-if="item.postId <= 2" 
                    name="fire" 
                    color="red"
                    class="icon"
                />
            </div>
        </van-list>
    </div>
</template>

<script>
import { postList } from '@/assets/data/data'
export default {
    name: 'QaIndex',
    data() {
         return {
            list: postList,
            loading: false,
            finished: false,
        }
    },
    methods: {
        onLoad() {
        // 异步更新数据
        // for (let i = 0; i < 10; i++) {
        //     this.list.push(this.list.length + 1);
        // }
        // 加载状态结束
        this.loading = false;
        this.finished = true;
        },
        goToPost(event) {
            this.$router.push(`/post/${event}`)
            // console.log(event)
        }
  },
}
</script>

<style lang="less" scoped>
  .my-swipe .van-swipe-item {
        height: 200px;
        color: #fff;
        font-size: 20px;
        text-align: center;
        background-color: #39a9ed;
  }
  .img {
      width: 100%;
      height: 100%;
  }
  .list {
      font-size: 15px;
      padding: 10px;
      border-bottom: .2px solid #c3c3c3;
      .num {
        font-style: italic;
        font-weight: 600;
        color: rgb(255, 72, 0);
      }
      .normal {
        font-style: italic;
        font-weight: 400;
        color: orange;
      }
      .icon {
          float: right;
      }
  }
</style>