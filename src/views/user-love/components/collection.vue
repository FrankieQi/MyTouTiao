<template>
  <div class="collect_contain">
      <Publish-item
        v-for="(collectItem,index) in collects" 
        :key="index" 
        :userPublishItem="collectItem"
      ></Publish-item>
  </div>
</template>

<script>
import PublishItem from '@/components/publish_item/index'
export default {
    name: 'collect',
    components: {
        PublishItem
    },
    data() {
        return {
            
        }
    },
    props: {
        collects: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>