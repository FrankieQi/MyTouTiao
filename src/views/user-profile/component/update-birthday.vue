<template>
  <div class="update-birthday">
    <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
    data() {
        return {
            minDate: new Date(1988, 0, 1),
            maxDate: new Date(),
            currentDate: new Date(this.value),
        }
    },
    methods: {
        async onConfirm() {
            // 请求提交更新用户生日
            // 更新父组件中的生日
            // const date = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getDate()}`
            const date = dayjs(this.currentDate).format('YYYY-MM-DD')
            this.$toast.loading({
                message:'保存中',
                forbidClick: true // 禁止背景点击
            })
            await updateUserProfile({
                birth: date
            })
            this.$emit('close') // 关闭弹窗
            this.$emit('input', date) // 只修改父组件的页面字段
            this.$toast.success({
                message:'保存成功',
                forbidClick: true // 禁止背景点击
            })
        }
    },
    props:{
        value: {
            type: String,
            required: true
        }
    }
}
</script>

<style>

</style>