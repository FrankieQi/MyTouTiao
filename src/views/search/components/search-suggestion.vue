<template>
  <div class="search-suggestion">
      <van-cell
        icon="search"
        v-for="(str,index) in suggestions"
        :key="index"
        @click="$emit('search',str)"
      >
        <div slot="title" v-html="highight(str)"></div>
      </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from "lodash"
export default {
    name:'search-suggestion',
    data() {
        return {
            suggestions: [] //联想的数组
        }
    },
    props: {
        searchText: {
            type: String,
            required: true
        }
    },
    // watch: {
    //     //只要输入框的值发生了变化就会执行以下方法
    //     // searchText() {
    //     //     console.log('hello');
    //     // }
    //     searchText: {
    //         //每输入一次就会调用一次接口
    //         handler: debounce(async function() {
    //             const { data } = await getSearchSuggestions(this.searchText);
    //             this.suggestions = data.data.options
    //         },200),
    //         immediate:true //这么写以后会在数据变化马上监听，就算这个组件还没渲染出来，主要去除第一次监听不到数值的情况
    //     }
            
    // },
    methods: {
        highight(str) {
            // console.log(str);//返回的就是查出来的每一项数据
            // /this.searchText/错的写法
            return str.replace(new RegExp(this.searchText,'gi'),`<span style="color: #3296fa">${this.searchText}</span>`)
        }
    }
}
</script>

<style scoped lang="less">

</style>