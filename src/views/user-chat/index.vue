<template>
  <div class="user-chat">
        <van-nav-bar
            class="app-nav-bar"
            title="小方同学"
            left-arrow
            @click-left="$router.back()"
        />
        <van-cell-group class="message-list">
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
            <van-cell title="单元格" />
        </van-cell-group>
        <van-cell-group class="send-message-wrap">
            <van-field
                v-model="message"
                
                clearable
                placeholder="请输入消息"
            >
                <template #button>
                    <van-button size="small" type="primary">发送</van-button>
                </template>
            </van-field>
        </van-cell-group>
  </div>
</template>

<script>
import {io}  from "socket.io-client"

export default {
    name: 'UserChat',
    data() {
        return {
            message: ""
        }
    },
    created() {
        // const socket = io("http://api-toutiao-web.itheima.net");
        // socket.on('connect', function() {
        //     console.log('连接建立成功')
        // })
        // socket.on('disconnect', function() {
        //     console.log('失败')
        // })
    }
}
</script>

<style scoped lang="less">
.send-message-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}
.message-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 44px;
    top: 44px;
    overflow-y: auto;
}
</style>