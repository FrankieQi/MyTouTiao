<template>
    <div class="channel-edit">
        <div class="empty"></div>
        <div class="main">
            <van-cell center :border="false">
                <div slot="title"  class="channel-title">我的频道</div>
                <van-button
                    class="edit-button"
                    type="danger"
                    plain
                    round
                    size="mini"
                    @click="isEdit = !isEdit"
                >{{isEdit ? '完成' : '编辑'}}</van-button>
            </van-cell>
            <van-grid :gutter="10">
                <van-grid-item 
                    class="grid-item "
                    :icon="(isEdit) ? 'clear' : ''"
                    v-for="(channel,index) in userChannels" 
                    :key="index" 
                    @click="onUserChannelClick(channel,index,channel.id-1)"
                    :text="channel.cname" />
            </van-grid>
            <van-cell center :border="false">
                <div slot="title" class="channel-title">频道推荐</div>
            </van-cell>
            <van-grid :gutter="10">
                <van-grid-item 
                    class="grid-item"
                    v-for="(channel,index) in recommendChannels" 
                    :key="index" 
                    :text="'+ '+channel.cname" 
                    @click="onAdd(channel)"/>
            </van-grid>
        </div>
    </div>
</template>

<script>
import { getAllChannels,addUserChannel,deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/stroage'

export default {
    name: 'ChannelEdit',
    data() {
        return {
            allChannels:[], //所有的频道
            isEdit: false, //控制编辑的显示状态
            userChannels: []
        }
    },
    computed: {
        ...mapState(['user']),
        //推荐的频道列表
        // userChannels() {
        //     //所有频道减去我的频道就是推荐的频道
        //     //filter方法：过滤数据，根据方法返回得布尔值true来收集数据
        //     //满足条件得就收集起来，所以是找满足条件的所有元素 
        //     return this.allChannels.filter(channel => {
        //         //判断channel是不是用户频道
        //         //find方法是查找满足条件的单个元素
        //         return !this.recommendChannels.find(userChannel => {
        //             // 找到满足该条件的元素
        //             return userChannel.id === channel.id
        //         })
        //     })
        // }
    },
    props:{
        recommendChannels:{
            type: Array,
            required: true
        },
        active: {
            type: Number,
            required: true
        }
    },
    created() {
        this.loadAllChannels()
        // this.userChannels = localStorage.getItem('channels')
    },
    methods: {
        async loadAllChannels () {
            const  data  = await getAllChannels();
            console.log(data)
            this.allChannels = data.data
        },
        async onAdd(channel) {
            try {
                if (this.user) {
                // 已登录，数据存储到线上
                await addUserChannel({
                    cids: channel.id, // 频道 id
                    token:  this.user.token// 频道的 序号
                    })
                    this.userChannels.push(channel)
                    // setItem('channels', this.userChannels)
                } else {
                    // 未登录，数据存储到本地
                    setItem('channels', this.userChannels)
                }
                this.$toast('添加频道成功')
            } catch (err) {
                console.log(err)
                this.$toast('添加频道失败')
            }
        },
        onUserChannelClick(channel,index,id) {
            //编辑状态，删除频道
            if(this.isEdit) {
                this.deleteChannel(channel,index)
            } else {
                this.switchChannel(id)
            }
            //非编辑状态要跳转
        },
        async deleteChannel(channel,index) {
            console.log(index)
            //从索引开始删除一个，包括索引本身
            // if(index === 0) return;
            //如果删除的是当前激活频道之前的频道
            if(index <= this.active) {
                //更新激活频道的索引,就是把active减去1这样就能确保激活的还是原来那个
                this.$emit('update-active',this.active+1);
            }
            this.userChannels.splice(index,1);
            //数据持久化
            if(this.user) {
                console.log(channel.id)
                //登录了，持久化到线上
                await deleteUserChannel({
                    cid: channel.id,
                    token: this.user.token
                });
                console.log(123456789)
            } else {
                //没有登录，持久化到本地
                setItem('channels', this.userChannels);
                console.log(987654321)
            }
        },
        switchChannel(index) {
            this.$emit('update-active',index);
            this.$emit('close');
        }
    },
    
}
</script>

<style lang="less" scoped>
.channel-edit {
    
    .empty {
        width: 100%;
        height: 50px;
    }
    // padding-top: 44px;
    .main {
        position: fixed;
        top: 230px;
        bottom: 0;
        overflow-y: auto;
        .edit-button {
            padding: 0 15px;
            letter-spacing: 2px;
            font-size: 12px;
        }
        .channel-title{
            font-size: 16px;
            color: #333;
        }
        .grid-item {
            width: 80px;
            height: 43px;
            /deep/.van-grid-item__content {
                background-color: #f4f5f6;
                .van-grid-item__text {
                    font-size: 14px;
                    margin-top: 0;
                }
            }
            /deep/.van-grid-item__icon {
                position: absolute;
                right: -5px;
                top: -5px;
                font-size: 20px;
                color: #ccc;
            }
            
        }
        .active {
            /deep/.van-grid-item__text {
                color: red!important;
            }
            
        }
    }
    
}
</style>