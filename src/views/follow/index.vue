<template>
  <div class="follow_contain">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
        <follow-item
             v-for="(followItem,index) in followList" :key="index" :follow="followItem"
        ></follow-item>
    </van-list>
  </div>
</template>

<script>
import FollowItem from '@/components/follow-item'
import { getUserFollowList } from '@/api/user'
export default {
    name: 'followIndex',
    components: {
        FollowItem
    },
    data() {
        return {
            page: 1,
            per_page: 20,
            loading: false,
            finished: false,
            followList: [], // 关注列表
        }
    },
    mounted() {
        // this.load()
    },
    methods: {
        async onLoad() {
            // console.log('触发')
            let  data  = await getUserFollowList({
               token: this.$store.state.user.token
            })
            //2. 把数据放到数组中
            const  results  = data.data
            console.log(results)
            this.followList = results
            // this.followList.push(...results);
            //3. 设置本次加载状态全部结束，它才可以判断是否需要加载下一次，否则就会永远停在这里
            this.loading = false;

            //4. 数据全部加载完成
            if(results.length == data.data.length) {
                this.finished = true;
                //获取下一页的数据
                // console.log(123)
            }
            console.log(data)
        }
    }
}
</script>

<style>

</style>