<template>
    <div class="login-container">
        <van-nav-bar
            class="app-nav-bar"
            title="登录 / 注册"
            left-arrow
            @click-left="$router.back()"
        />
        <!-- 基于vant的表单验证 
             只有表单验证通关了表单中定义的验证规则才会触发onlogin事件
             减少了错误触发的可能性-->
        <van-form @submit="onLogin" 
            :show-error="false" 
            :show-error-message="false"
            validate-first
            ref="login-form"
            @failed="onFailed">
            <van-field
                v-model="user.mobile"
                icon-prefix="toutiao"
                left-icon="shouji"
                placeholder="请输入手机号"
                name="mobile"
                center
                :rules="formRules.mobile"
            />
            <van-field
                v-model="user.code"
                icon-prefix="toutiao"
                clearable
                left-icon="yanzhengma"
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
                        @click.prevent="onSendSms">发送验证码
                    </van-button>
                </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button 
                type="info" 
                block 
                class="login-btn"
                >登录</van-button>
            </div>
        </van-form>
        <div class="msg-tip">默认账号：13911111111  密码：246810</div>
    </div>
</template>

<script>
import { login,sendSms } from '@/api/user'
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
               console.log(data);
               this.$toast.success('登录成功');
                //将后端返回的用户登录状态（token等数据）放到Vuex的容器中
                this.$store.commit('setUser',data.data);
                //登录成功回到之前的页面
                this.$router.back();
            } catch {
                console.log('失败');
                this.$toast.fail('登录失败，手机号或验证码错误');
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
            try {//验证手机号格式
                await this.$refs['login-form'].validate('mobile');//失败返回一个对象进入catch的执行，成功则成功
                this.isSendSmsLoading = true // 展示按钮的 loading 状态，防止网络慢用户多次点击触发发送行为
                //验证通过发送验证码
                await sendSms(this.user.mobile);
                //倒计时的处理
                this.isCountDownShow = true;
            } catch (error) {//如果验证失败就进入到这里来
                let message = '';
                if(error && error.response && error.response.status === 429) {
                    //发短信失败的提示
                    message = '发送太频繁,请稍后重试'
                } else if(error.name === 'mobile') {
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
                mobile:'',//手机号
                code:'' //验证码
            },
            formRules: {
                mobile: [
                    { required: true, message: '请输入手机号' },
                    { pattern:/^1[3|5|7|8]\d{9}$/ , message: '请输入正确手机号'}
                ],
                code: [
                    { required: true, message: '请输入验证码' },
                    { pattern:/^\d{6}$/ , message: '请输入正确验证码'}
                ]
            },
            isCountDownShow: false,
            isSendSmsLoading: false
        }
    },
}
</script>

<style lang="less" scoped>
.login-container{
    .login-btn-wrap {
        padding: 26px 16px;
        .login-btn {
            border: none;
            .van-button__text{
                font-size: 15px;
            }
        }
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
}

</style>