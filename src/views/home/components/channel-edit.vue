<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
       <van-button
       size="mini"
       round
       type="danger"
       plain
       @click="isEditShow=!isEditShow"
      >{{isEditShow?'完成': '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(item,index) in userChannel"
        :key="item.id"
        @click="userChannelEdit(index)"
      >
      <span slot="text" class="text" :class="{active:value===index}">{{item.name}}</span>
      <van-icon slot='icon' v-show="isEditShow && index!==0" name="close"></van-icon>
      </van-grid-item>
    </van-grid>

    <van-cell title="推荐频道" :border="false" />
    <van-grid :gutter="10">
      <van-grid-item
        v-for="channel in remainingChannels"
        :key="channel.id"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/user.js'
import { setItem } from '@/utils/storage'
export default {
  props: {
    userChannel: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  watch: {
    userChannel () {
      setItem('user-channels', this.userChannel)
    }
  },
  computed: {
    remainingChannels () {
      const { allchannel, userChannel } = this
      // 剩余频道 = 所有频道 - 我的频道
      const channels = []
      // 遍历所有频道
      allchannel.forEach(item => {
      // 如果我的频道中不包含当前被遍历的频道，则要
        if (!userChannel.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  data () {
    return {
      allchannel: [],
      isEditShow: false
    }
  },
  methods: {
    async getallchannel () {
      const { data } = await getAllChannels()
      // console.log(data)
      this.allchannel = data.data.channels
    },
    userChannelEdit (index) {
      if (this.isEditShow && index !== 0) {
        this.userChannel.splice(index, 1)
      } else {
        this.$emit('input', index)
        this.$emit('close')
      }
    },
    onAdd (channel) {
      this.userChannel.push(channel)
    }
  },
  created () {
    this.getallchannel()
  }
}
</script>

<style scoped lang='less'>
.channel-edit {
  padding-top:40px;
}
/deep/ .van-grid-item__icon-wrapper {
  position: absolute;
  top: -14px;
  right: -5px;
  .van-icon-close {
    font-size: 14px;
  }
}
.active {
  color: red
}
.text {
  font-size: 14px
}
</style>
