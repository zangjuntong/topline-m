<template>
   <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
     <!-- {{channel}} -->
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-cell
                v-for="(item,index) in list"
                :key="index"
                :title="item.title"
                @click="$router.push('/article/' + item.art_id)"
              />
            </van-list>

        </van-pull-refresh>
</template>

<script>
import { getArticals } from '@/api/artical.js'
export default {
  props: {
    // 频道对象，父组件提供
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      timestamp: null,
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  methods: {

    async  onLoad () {
      // 异步更新数据
      const { data } = await getArticals({
        channel_id: this.channel.id, // 频道id

        // 第1次使用 Date.now() 获取最新数据
        // 下一页的数据使用本次返回的数据中的 timestamp
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      const results = data.data.results
      this.list.push(...results)
      this.loading = false
      // this.finished = true
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      const { data } = await getArticals({
        channel_id: this.channel.id, // 频道id
        timestamp: Date.now(),
        with_top: 1
      })
      this.list.unshift(...data.data.results)
      this.$toast('刷新成功')
      this.isLoading = false
    }
  }
}
</script>

<style>

</style>
