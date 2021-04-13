<template>
  <div class="update-photo">
      <img  class="image" :src="image" alt="" ref="image">
      <van-nav-bar
        class="toolbar"
        left-text="取消"
        right-text="确认"
        @click-left="$emit('close')"
        @click-right="onConfirm"
      ></van-nav-bar>
  </div>
</template>

<script>
import {updateUserPhoto} from '@/api/user';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css'
export default {
    name: 'UpdatePhoto',
    data() {
        return {
            image: window.URL.createObjectURL(this.file),
            cropper: null // 裁切器实例
        }
    },
    mounted() {
        const image = this.$refs.image
        const cropper = new Cropper(image, {
            viewMode: 1,
            dragMode: 'move',
            aspectRatio: 1,
            autoCropArea: 1,
            cropBoxMovable: false,
            cropBoxResizable: false,
            background: false,
            movable: true
        })
        this.cropper = cropper
    },
    props: {
        file: {
            required: true
        }
    },
    methods: {
        getCroppedCanvas() {
            return new Promise(resolve => {
                // 包装成promise就可以避免回调嵌套
                this.cropper.getCroppedCanvas().toBlob(file => {
                    // 裁切后的文件对象
                    resolve(file)
                })
            })
        },
        async onConfirm() {
            console.log(132)
            this.$toast.loading({
                message:'保存中',
                forbidClick: true // 禁止背景点击
            })
            const file = await this.getCroppedCanvas() // 返回了promise就可以用await
            // 可以把回调函数抽离出来，不用再嵌套updateUserPhoto到getCroppedCanvas中
            const fd = new FormData()
            fd.append('photo', file)
            console.log(fd)
            // 这里要求的content-type是mulitipart/form-data,就要一定要提交formData对象
            // 专门用于图片上传，不能提交{}
            // const fd = new FormData()
            // fd.append('photo', 文件对象) 所以要在父组件中传递过来文件对象
            // fd.append('photo', this.file)
            await updateUserPhoto(fd)
            this.$toast.success('保存成功')
            this.$emit('close')
            // 更新父组件头像
            // 这里用window.URL.createObjectURL(file)在裁切后转成blob
            //this.$emit('update-photo', this.image)
            this.$emit('update-photo', window.URL.createObjectURL(file))
        }
    }
}
</script>

<style>
.toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
}
.image {
    display: block;
    max-width: 100%;
}
</style>