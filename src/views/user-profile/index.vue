<template>
   <div class="user-profile">
       <van-nav-bar
            class="app-nav-bar"
            title="个人信息"
            left-arrow
            @click-left="$router.back()"
        />
        <input 
            type="file"
            hidden 
            ref="file"
            accept="image/*"
            @change="onFileChange"
        >
        <!-- /导航栏 -->
        <van-cell title="头像" is-link @click="$refs.file.click()">
            <van-image
            width="30"
            height="30"
            round
            fit="cover"
            :src="user.photo"
            />
        </van-cell>
        <van-cell 
            title="昵称" 
            is-link
            :value="user.name"
            @click="isEditNameShow = true"
        ></van-cell>
        <van-cell 
            title="性别" 
            is-link
            :value="user.gender === 0 ? '男' : '女'"
            @click="isEditGenderShow = true"
        ></van-cell>
        <van-cell 
            title="生日" 
            is-link
            :value="user.birthday"
            @click="isEditBirthdayShow = true"
        ></van-cell>
        <van-popup
            v-model="isEditNameShow"
            position="bottom"
            :style="{height: '60%'}"
        >
            <!-- 当你要传递给子组件的数据既要使用又要修改的时候。例如这里的name
                这种情况下可以用v-model简写
                 -->
            <!-- 比如这个：@close="isEditNameShow= false"
              :name="user.name"
              @update-name="user.name = $event" -->
            <!-- 因为v-model是有双向绑定的作用的，
                v-model="user.name"
                默认传递一个名字叫value的数据,value的值就是你绑定谁他就传递谁
                :value="user.name"
                默认监听input事件   即@input="user.name = $event"
                子组件可以声明一个$emit('input',xxxx) 把值传递过来 -->
            <!-- sync的原理：用来自动监听多个数据的更新，每个sync修饰符监听一个属性
                可以复用多个sync
                :gender.sync = "user.gender"相当于
                ===>
                @update:gender="user.gender = $event" <==> @update:属性名称="user.gender = $event"
                :gender = "user.gender"
                在子组件中只要监听
                this.$emit('update:gender', xxx) 即可，子组件就能修改到父组件中的数据了
                属性名也就是这里的gender要同步好
             -->
            <update-name 
              v-if="isEditNameShow"
              :gender.sync = "user.gender"
              v-model="user.name"
              @close="isEditNameShow= false"
            />
        </van-popup>
        <!-- 修改性别 -->
        <van-popup
            v-model="isEditGenderShow"
            position="bottom"
            :style="{ height: '30%'}"
        >
            <update-gender
                v-if="isEditGenderShow"
                v-model="user.gender"
                @close="isEditGenderShow = false"
            ></update-gender>
        </van-popup>
        <!-- 修改生日 -->
        <van-popup
            v-model="isEditBirthdayShow"
            position="bottom"
            :style="{ height: '50%'}"
        >
            <update-birthday
                v-if="isEditBirthdayShow"
                v-model="user.birthday"
                @close="isEditBirthdayShow = false"
            ></update-birthday>
        </van-popup>
        <!-- 修改头像 -->
        <van-popup
            v-model="isEditPhotoShow"
            class="photo-update"
            position="bottom"
            :style="{ height: '100%'}"
        >
            <update-photo
                v-if="isEditPhotoShow"
                :file="previewImage"
                @close="isEditPhotoShow = false"
                @update-photo="user.photo = $event"
            ></update-photo>
        </van-popup>
   </div>
</template>

<script>
import {getUserProfile} from '@/api/user'
import UpdateName from './component/update-name'
import UpdateGender from './component/update-gender'
import UpdateBirthday from './component/update-birthday'
import UpdatePhoto from './component/update-photo'
export default {
    name: 'UserProfile',
    data() {
        return {
            user: {}, // 用户信息
            isEditNameShow: false, // 编辑昵称的显示状态
            isEditGenderShow: false, // 编辑性别的显示状态
            isEditBirthdayShow: false, // 编辑生日的显示状态
            isEditPhotoShow: false, // 编辑头像的显示状态
            previewImage: null // 上传预览图片
        }
    },
    components: {
        UpdateName,
        UpdateGender,
        UpdateBirthday,
        UpdatePhoto
    },
    created() {
        this.loadUserProfile()
    },
    methods: {
        async loadUserProfile() {
            // 获取用户信息
            const { data } = await getUserProfile()
            // console.log(data);
            this.user = data.data
        },
        onFileChange() {
            // input原生事件，在fileInput发生改变的时候触发
            // 1. 展示弹出层  2. 预览图片
            // 有个问题就是上一次选择和这一次选择的一样不触发
            // 解决方案就是把原来组件的缓存清除掉
            const file = this.$refs.file.files[0]
            // 得到的是新的图片的URL
            // console.log(file)
            this.previewImage = file
            this.$refs.file.value = ''
            this.isEditPhotoShow = true
        }
    }
}
</script>

<style scoped lang="less">
.van-popup{
    background-color: #f5f7f9!important;
}
.photo-update {
    background: #000!important;
}
</style>