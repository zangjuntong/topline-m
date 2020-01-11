<template>
  <div>
    <!-- fixed -->
    <van-nav-bar title="首页" class="navlist" fixed ></van-nav-bar>
    <!-- 标签 -->
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in userChannels" :key="item.id">

        <articalList :channel='item'></articalList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import articalList from './components/artical.vue'

export default {
  data () {
    return {
      active: 0,
      userChannels: []
    }
  },
  components: {
    articalList
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
  position: absolute;
  top:46px;
  right: 0;
  left: 0;
  z-index: 2
}
</style>
