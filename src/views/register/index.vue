<template>
    <div class="register-container">
        <van-nav-bar
            class="app-nav-bar"
            title="注册"
            left-arrow
            @click-left="$router.back()"
        />
        <!-- 基于vant的表单验证 
             只有表单验证通关了表单中定义的验证规则才会触发onlogin事件
             减少了错误触发的可能性-->
        <div class="register_bg">
            <img :src="require('@/assets/images/register/registerImg.png')" alt="">
        </div>
        <van-form @submit="onLogin" 
            :show-error="false" 
            :show-error-message="false"
            validate-first
            ref="login-form"
            @failed="onFailed"
            class="main_container">
            <van-field
                v-model="user.email"
                left-icon="user-o"
                placeholder="请输入邮箱"
                name="email"
                center
                :rules="formRules.email"
            />
            <van-field
                v-model="user.code"
                icon-prefix="toutiao"
                clearable
                left-icon="shouji"
                placeholder="请输入验证码"
                name="code"
                center
                :rules="formRules.code"
            >
                <template #button>
                    <van-count-down
                        v-if="isCountDownShow"
                        :time="1000 * 60"
                        format="ss s"
                        @finish="isCountDownShow = false"
                    />
                    <van-button 
                        v-else
                        size="small" 
                        round 
                        class="send-btn"
                        :loading="isSendSmsLoading"
                        @click.prevent="onSendSms">发送邮箱
                    </van-button>
                </template>
            </van-field>
            <van-field
                v-model="user.password"
                icon-prefix="toutiao"
                left-icon="yanzhengma"
                placeholder="请输入密码"
                name="password"
                center
                :rules="formRules.password"
            />
            <van-field
                v-model="user.re_password"
                icon-prefix="toutiao"
                left-icon="yanzhengma"
                placeholder="请确认密码"
                name="re_password"
                center
                :rules="formRules.re_password"
            />
            <!-- <div class="login-btn-wrap">
                <van-button 
                type="info" 
                block 
                round
                class="login-btn"
                >登录</van-button>
            </div> -->
            <div class="login-btn-wrap">
                <van-button 
                type="warning" 
                block 
                round
                class="login-btn"
                >新用户注册</van-button>
            </div>
        </van-form>
        <!-- <div class="msg-tip">默认账号：13911111111  密码：246810</div> -->
    </div>
</template>

<script>
import { register,sendEmail } from '@/api/user'
export default {
    name: "registerIndex",
    methods: {
        async onLogin() {
            // 开始转圈圈
            this.$toast.loading({
                duration: 0, // 持续时间，0表示持续展示不停止
                forbidClick: true, // 是否禁止背景点击
                message: '登录中...' // 提示消息
            });
            if(this.password !== this.re_password) {
                this.$toast.fail('注册失败，密码不一致');
                return
            }
            try {
               const { data } = await register(this.user); 
               console.log(data);
               this.$toast.success('注册成功');
                //将后端返回的用户登录状态（token等数据）放到Vuex的容器中
                // this.$store.commit('setUser',data.data);
                // 清除layout的缓存
                // this.$store.commit('removeCachePage','LayoutIndex')
                //登录成功回到之前的页面
                this.$router.push('/login');
            } catch(error) {
                console.log('失败');
                this.$toast.fail('注册失败，验证码错误');
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
        async onSendSms() {//发送验证码事件，不会走onFailed这个事件了
            try {//验证邮箱格式
                await this.$refs['login-form'].validate('email');//失败返回一个对象进入catch的执行，成功则成功
                this.isSendSmsLoading = true // 展示按钮的 loading 状态，防止网络慢用户多次点击触发发送行为
                //验证通过发送验证码
                await sendEmail(this.user.email)
                //倒计时的处理
                this.isCountDownShow = true;
            } catch (error) {//如果验证失败就进入到这里来
                let message = '';
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                // console.log(error)
                if(error && error.response.data.error_code == 10010) {
                    //发短信失败的提示
                    message = '用户已存在，请前往登陆'
                } else if(error.name === 'email') {
                    //表单失败的提示
                    message = error.message;
                } else {
                    //未知错误
                    message = '发送失败，请稍后重试'
                }
                //提示用户
                this.$toast({
                    message: message,
                    position: 'top'
                    });
            }
            // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
            this.isSendSmsLoading = false
        }
    },
    data() {
        return {
            user: {
                email:'',//手机号
                code:'', //验证码
                password: '', // 密码
                re_password: '' // 确认密码
            },
            formRules: {
                email: [
                    { required: true, message: '请输入邮箱' },
                    { pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ , message: '请输入正确邮箱号'}
                ],
                code: [
                    { required: true, message: '请输入验证码' },
                    { pattern:/^\d{4}$/ , message: '请输入正确验证码'}
                ],
                password: [
                    { required: true, message: '请输入密码' },
                    { pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/ , message: '密码至少包含数字和英文，长度6-20'}
                ],
                re_password: [
                    { required: true, message: '请输入密码' },
                    { pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/ , message: '密码至少包含数字和英文，长度6-20'}
                ]
            },
            isCountDownShow: false,
            isSendSmsLoading: false
        }
    }
}
</script>

<style lang="less" scoped>
.register-container{
        background: #fff;
        height: 100vh;
    .register_bg {
        img {
            width: 100%;
            height: 200px;
        }
    }
    .main_container {
        margin-top: 10px;
        padding: 0 20px;
        background: #fff;
    }
    .login-btn-wrap {
        padding: 6px 16px 0px;
        .login-btn {
            border: none;
            background-image: linear-gradient(to right, #556AFC , #7984FE);
            height: 42px;
            .van-button__text{
                font-size: 15px;
            }
        }
    }
    
    .send-btn {
        width: 76px;
        height: 23px;
        background-image: linear-gradient(to right, #7381FE , #7885FE);
        .van-button__text{
            color:#fff;
            font-size: 11px;
        }
    }
    .msg-tip {
        text-align: center;
        font-size: 16px;
        color: #cdcdcd;
    }
    .van-cell  {
        border-radius: 20px;
        margin-bottom: 20px;
        border: 1px solid #c6c6c6;
        box-shadow: 5px 5px 5px  #888888;
        /deep/.van-field__left-icon {
            color: #7381FE;
            font-weight: 800;
        }
    }
}

</style>