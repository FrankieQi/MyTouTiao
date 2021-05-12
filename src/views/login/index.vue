<template>
    <div class="login-container">
        <van-nav-bar
            class="app-nav-bar"
            title="登录"
            left-arrow
            @click-left="$router.back()"
        />
        <!-- 基于vant的表单验证 
             只有表单验证通关了表单中定义的验证规则才会触发onlogin事件
             减少了错误触发的可能性-->
        <van-image
            round
            class="image_avatar"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
        <van-form @submit="onLogin" 
            :show-error="false" 
            :show-error-message="false"
            validate-first
            ref="login-form"
            @failed="onFailed"
            class="main_container">
            <van-field
                v-model="user.email"
                icon-prefix="toutiao"
                left-icon="shouji"
                placeholder="请输入邮箱"
                name="email"
                center
                :rules="formRules.email"
            />
            <van-field
                v-model="user.password"
                icon-prefix="toutiao"
                clearable
                type="password"
                left-icon="yanzhengma"
                placeholder="请输入密码"
                name="password"
                center
                :rules="formRules.password"
            >
            </van-field>
            <div class="login-btn-wrap">
                <van-button 
                type="info" 
                block 
                round
                class="login-btn"
                >登录</van-button>
            </div>
            <div class="register_text">还没有账号？<span class="register_btn" @click="goResgister">点击注册</span></div>
            <!-- <div class="login-btn-wrap">
                <van-button 
                    type="warning" 
                    block 
                    round
                    class="login-btn"
                    to="/register"
                >新用户注册</van-button>
            </div> -->
        </van-form>
        <div class="background_login">
            <img :src="require('@/assets/images/login/loginBG.png')" alt="">
        </div>
    </div>
</template>

<script>
import { login,getToken } from '@/api/user'
export default {
    name: "LoginIndex",
    methods: {
        async onLogin() {
            // 开始转圈圈
            this.$toast.loading({
                duration: 0, // 持续时间，0表示持续展示不停止
                forbidClick: true, // 是否禁止背景点击
                message: '登录中...' // 提示消息
            });
            try {
               const { data } = await login(this.user); 
               let id = data.id
               const res = await getToken(id)
               console.log(data)
               console.log(res)
               this.$toast.success('登录成功');
                //将后端返回的用户登录状态（token等数据）放到Vuex的容器中
                this.$store.commit('setUser',res.data);
                // 清除layout的缓存
                // this.$store.commit('removeCachePage','LayoutIndex')
                //登录成功回到之前的页面
                this.$router.push('/');
            } catch(error) {
                console.log('失败');
                console.log(error.response.data);
                let msg = error.response.data.msg
                if(error) {
                    this.$toast.fail(msg);
                }
                // this.$toast.fail('登录失败，手机号或验证码错误');
            }
            
        },
        onFailed(error) {
            if(error.errors[0]) {
                this.$toast({
                    message: error.errors[0].message,
                    position: 'top' 
                })
            }
        },
        goResgister() {
            this.$router.push('/register')
        }
        // async onSendSms() {//发送验证码事件，不会走onFailed这个事件了
        //     try {//验证手机号格式
        //         await this.$refs['login-form'].validate('email');//失败返回一个对象进入catch的执行，成功则成功
        //         this.isSendSmsLoading = true // 展示按钮的 loading 状态，防止网络慢用户多次点击触发发送行为
        //         //验证通过发送验证码
        //         await sendSms(this.user.email);
        //         //倒计时的处理
        //         this.isCountDownShow = true;
        //     } catch (error) {//如果验证失败就进入到这里来
        //         let message = '';
        //         if(error && error.response && error.response.status === 429) {
        //             //发短信失败的提示
        //             message = '发送太频繁,请稍后重试'
        //         } else if(error.name === 'email') {
        //             //表单失败的提示
        //             message = error.message;
        //         } else {
        //             //未知错误
        //             message = '发送失败，请稍后重试'
        //         }
        //         //提示用户
        //         this.$toast({
        //             message: message,
        //             position: 'top'
        //             });
        //     }
        //     // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
        //     this.isSendSmsLoading = false
        // }
    },
    data() {
        return {
            user: {
                email:'',//手机号
                password:'' //验证码
            },
            formRules: {
                email: [
                    { required: true, message: '请输入邮箱号' },
                    { pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/  , message: '请输入正确邮箱号'}
                ],
                password: [
                    { required: true, message: '请输入密码' },
                    { pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/  , message: '请输入正确密码'}
                ]
            },
            isCountDownShow: false,
            isSendSmsLoading: false
        }
    }
}
</script>

<style lang="less" scoped>
.login-container{
    .image_avatar {
        position: relative;
        top: 100px;
        margin-left: 50%;
        left: -40px;
        width: 80px;
        height: 80px;
    }
    .main_container {
        margin-top: 130px;
        padding: 0 20px;
    }
    .login-btn-wrap {
        padding: 26px 16px 0px;
        .login-btn {
            border: none;
            height: 40px;
            background-image: linear-gradient(to right, #33B1FE , #0478DB);
            .van-button__text{
                font-size: 15px;
            }
        }
    }
    .register_text {
        font-size: 14px;
        color: #B0B4B7;
        position: relative;
        margin-left: 50%;
        left: -70px;
        top: 15px;
        .register_btn {
            color: #0478DB;
        }
    }
    .van-cell  {
        border-radius: 20px;
        margin-bottom: 20px;
        box-shadow: 5px 5px 5px  #888888;
    }
    .send-btn {
        width: 76px;
        height: 23px;
        background-color: #ededed;
        .van-button__text{
            color:#666;
            font-size: 11px;
        }
    }
    .msg-tip {
        text-align: center;
        font-size: 16px;
        color: #cdcdcd;
    }
    .background_login {
        position: fixed;
        bottom: 0;
        img {
            width: 100%;
        }
    }
}

</style>