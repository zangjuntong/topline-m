<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
     <van-cell v-for="(article, index) in list" :key="index" :title="article.title" @click="$router.push({
        name: 'article',
        params: {
          articleId: article.art_id.toString()
        }
      })"/>
  </van-list>
</template>

<script>
import { getHistoryArticles } from '@/api/artical'

export default {
  name: 'UserArticle',
  components: {},
  props: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 当前页码
      perPage: 10 // 每页大小
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 1. 请求获取数据
      const { data } = await getHistoryArticles({
        page: this.page,
        per_page: this.perPage
      })
      // 2. 将数据添加到列表中
      const { results } = data.data
      this.list.push(...results)
      // 3. 关闭本次 loading 结束
      this.loading = false
      // 4. 判断是否还有数据
      if (results.length) {
        this.page++ // 更新获取下一页数据的页码
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
