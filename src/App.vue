<template>
  <div id="app">
    <!-- 一级路由的出口，路由表中所有的顶层路由都是一级路由 -->
    <!-- keepalive只对该路由出口渲染的组件有效 -->
    <keep-alive :include="cachePages">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'app',
    computed: {
      ...mapState(['cachePages'])
    },
    mounted() {
      // console.log(this.cachePages)
    },
}
</script>
<style lang="less">

</style>
