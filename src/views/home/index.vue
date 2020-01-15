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
     <channelEdit
     v-model="active"
     @close='channelshow=fales'
     :user-channel='userChannels'></channelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import articalList from './components/artical.vue'
import channelEdit from './components/channel-edit.vue'
import { getItem } from '@/utils/storage'
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
      let channels = []

      // 2. 获取本地存储的频道列表
      const localUserChannles = getItem('user-channels')

      // 3. 如果本地存储有，就使用本地存储的
      if (localUserChannles) {
        channels = localUserChannles
      } else {
        // 4. 如果本地存储没有，则请求获取接口推荐的频道列表
        const { data } = await getUserChannels()
        channels = data.data.channels
      }

      // 5. 最后，把数据赋值到当前组件中
      this.userChannels = channels
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
