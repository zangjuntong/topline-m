<template>
  <div>
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
    />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/artical.js'

export default {
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },

  methods: {
    async onLoad () {
      const { data } = await getSearch({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.q // 搜索关键字
      })
      // console.log(data)
      const { results } = data.data
      this.list.push(...results)
      // 加载状态结束
      this.loading = false
      if (this.list.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
