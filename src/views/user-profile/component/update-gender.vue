<template>
  <div class="update-gender">
       <van-picker
        show-toolbar
        title="修改性别"
        :default-index="value"
        :columns="columns"
        @cancel="$emit('close')"
        @confirm="onConfirm"
        @change="onChange"
        />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
    name: 'updateGender',
    data() {
        return {
            columns: ['男','女'], // default-index正好对应上  是0还是1
            genderIndex: 0,
            value: 0
        }
    },
    props: {
        sex: {
            type: String,
            required: true,
        }
    },
    created() {
        if(this.sex == '男') {
            this.value = 0
        }else {
            this.value = 1
        }
    },
    methods: {
        onChange(data, value, index) {
            // console.log(index)
            this.genderIndex = index
        },
        async onConfirm() {
            console.log('确定');
            // 更新用户昵称 调用接口
            // 更新成功后修改父组件的name，并且关闭弹窗
            this.$toast.loading({
                message:'保存中',
                forbidClick: true // 禁止背景点击
            })
            // 把成功执行的代码放在try里面
            await updateUserProfile({
                sex: this.genderIndex+1
            })
            this.$emit('close') // 关闭弹窗
            if(this.genderIndex==0) {
                this.genderIndex = '男'
            } else {
                this.genderIndex = '女'
            }
            this.$emit('update-sex', this.genderIndex) // 只修改父组件的页面字段
            this.$toast.success({
                message:'保存成功',
                forbidClick: true // 禁止背景点击
            })
            
        }
    },
    // props: {
    //    value: {
    //        type: Number,
    //        required: true
    //    } 
    // }
}
</script>

<style scoped>

</style>