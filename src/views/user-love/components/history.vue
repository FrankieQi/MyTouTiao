<template>
  <div class="history_contain">
    <article-item 
        v-for="(history,index) in hostories" :key="index" :article="history"
    />
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
export default {
    name: 'history',
    components: {
        ArticleItem
    },
    data() {
        return {
            
        }
    },
    props: {
        hostories: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>