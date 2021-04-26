<template>
  <div class="update_name">
      <van-nav-bar
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onConfirm"
        title="修改名称"
      >
      </van-nav-bar>
      <div style="padding:10px">
        <van-field
            v-model="localName"
            rows="2"
            autosize
            type="textarea"
            maxlength="20"
            placeholder="请输入昵称"
            show-word-limit
        />
      </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
    name: 'updateName',
    components: {

    },
    data() {
        return {
            localName: this.value
        }
    },
    methods: {
        async onConfirm() {
            console.log('确定');
            // 更新用户昵称 调用接口
            // 更新成功后修改父组件的name，并且关闭弹窗
            this.$toast.loading({
                message:'保存中',
                forbidClick: true // 禁止背景点击
            })
            try { // 把成功执行的代码放在try里面
                await updateUserProfile({
                    username: this.localName
                })
                this.$emit('close') // 关闭弹窗
                this.$emit('input', this.localName) // 只修改父组件的页面字段
                this.$toast.success({
                    message:'保存成功',
                    forbidClick: true // 禁止背景点击
                })
            } catch (error) { // 把失败的代码放在catch里面
                if(error && error.response && error.response.status === 409) {
                    this.$toast.fail('昵称已存在')
                }
            }
            
        }
    },
    props: {
        // 这里接收的name是不被允许修改的，所以不能够去v-model="name"
        // 借助localName来修改值
        value: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped lang="less">

</style>