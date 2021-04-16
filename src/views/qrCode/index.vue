<template>
  <div class="qrCode_contain">
        <van-nav-bar
            class="app-nav-bar"
            title="二维码"
            left-arrow
            @click-left="$router.back()"
        />
        <div class="bgImg">
            <img :src="require('@/assets/images/qrCode/bg.jpg')" alt="">
        </div>
        <div class="qrBox">
            <div class="title">欢迎来到小方新闻</div>
            <div id="qrCode" ref="qrCodeDiv"></div>
        </div>

  </div>
</template>

<script>
import QRCode from 'qrcodejs2';
export default {
    name: 'QrCodeIndex',
    data() {
        return {
            
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.bindQRCode();
        })
    },
    methods: {
        bindQRCode: function () {
            new QRCode(this.$refs.qrCodeDiv, {
                text: 'http://xy.liruoning.cn:8001/',
                width: 200,
                height: 200,
                colorDark: "#000000", //二维码颜色
                colorLight: "#ffffff", //二维码背景色
                correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
            })
      }
    }
}
</script>

<style lang="less">
.qrCode_contain {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    // background-color: #F5F7F9;
    // background-image: url('@/assets/images/qrCode/bg.jpg');
    // .bg-contain('assets/images/qrCode/bg.jpg');
    .bgImg {
        position: absolute;
        z-index: -99;
    }
    .qrBox {
        display: flex;
        // justify-content: center;
        flex-direction: column;
        align-items: center;
        background-color: rgba(41, 45, 62, 0.7);
        width: 250px;
        height: 350px;
        margin: 180px auto 0px;
        border-radius: 12px;
        // border: 5px solid #000;
        .title {
            margin: 50px 0;
            color: linear-gradient(to right, #e8198b, #3B65BB);
            font-size: 15px;
        }
    }
}
    
</style>