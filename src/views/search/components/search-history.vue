<template>
  <div class="search-history">
      <van-cell
        title="历史记录"
      >
       <div v-if="isDeleteShow">
           <span @click="$emit('update-histories',[])">全部删除</span>
           &nbsp;&nbsp;&nbsp;
           <span @click="isDeleteShow = false">完成</span>
       </div>
       <van-icon 
            name="delete"
            v-else
            @click="isDeleteShow = true"
            ></van-icon>
      </van-cell>
      <van-cell 
        :title="history" 
        v-for="(history,index) in searchHistories"
        :key="index"
        @click="onDelete(history,index)"
        >
          <van-icon name="close" v-show="isDeleteShow"></van-icon>
      </van-cell>
  </div>
</template>

<script>
import { setItem,getItem } from '@/utils/stroage'
import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'

export default {
    name: 'search-history',
    props: {
        searchHistories: {
            type:Array,
            required:true
        }
    },
    data() {
        return {
            isDeleteShow: false
        }
    },
    methods: {
        onDelete(history,index) {
            //如果是删除状态，则执行删除
            if(this.isDeleteShow) {
               this.searchHistories.splice(index,1)
               //持久化处理
               //1.修改本地数据
               //2.请求接口删除线上
               //无论是否登录都持久到本地
                setItem('search-histories',this.searchHistories)
                return
            }

            //非删除状态，展示搜索结果
            this.$emit('search',history)
        }
    }
}
</script>

<style scoped lang="less">

</style>