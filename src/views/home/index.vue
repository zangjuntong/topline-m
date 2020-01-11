<template>
  <div class="home-container">
    <!-- fixed -->
    <van-nav-bar title="首页" class="navlist" fixed ></van-nav-bar>
    <!-- 标签 -->
    <van-tabs v-model="active">
      <van-icon name="wap-nav" slot="nav-right" class="icon_wenben" @click="channelshow=true"/>
      <van-tab :title="item.name" v-for="item in userChannels" :key="item.id">

        <articalList :channel='item'></articalList>
      </van-tab>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="channelshow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
     <channelEdit></channelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import articalList from './components/artical.vue'
import channelEdit from './components/channel-edit.vue'
export default {
  data () {
    return {
      channelshow: false,
      active: 0,
      userChannels: []
    }
  },
  components: {
    articalList,
    channelEdit
  },

  methods: {
    // 获取频道
    async  getChannels () {
      const { data } = await getUserChannels()
      this.userChannels = data.data.channels
      // console.log(data)
      console.log(data.data.channels)
    }

  },
  created () {
    this.getChannels()
  }
}
</script>

<style scoped lang='less'>
 ::v-deep .van-tabs__wrap {
  position: fixed;
  top:46px;
  right: 0;
  left: 0;
  z-index: 2
}
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
}
.icon_wenben {
  position: fixed;
  right: 0;
  line-height: 44px;
  background-color: white
}
</style>
