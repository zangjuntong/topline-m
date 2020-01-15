<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isresultshow=false"
        @input="onSearchInput"
      />
    </form>
    <!-- 列表组件 -->
    <search-result v-if="isresultshow" :q='searchText'></search-result>
    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchText">
      <van-cell
      :title="item"
      :key="index"
      v-for="(item,index) in suggestions"
      @click="onSearch(item)"
      icon="search">
      <div slot="title" v-html="heightlig(item)" ></div>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
     <van-cell-group v-else>
      <van-cell title="历史记录">
        <template v-if="isdeleteShow">
          <span @click="searchHristoys=[]">全部删除 </span>
          <span @click="isdeleteShow=false"> 完成</span>
        </template>
        <van-icon v-else name="delete" @click="isdeleteShow=true"></van-icon>
      </van-cell>
      <van-cell
        @click="onSearch(item)"
        :title="item" v-for="(item,index) in searchHristoys"
        :key="index">
        <van-icon
        v-show="isdeleteShow"
        @click="searchHristoys.splice(index,1)"
        name="close"></van-icon>
      </van-cell>
    </van-cell-group>

  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestion } from '@/api/artical.js'
import { setItem, getItem } from '@/utils/storage'
import { debounce } from 'lodash'

export default {
  data () {
    return {
      searchText: '',
      isresultshow: false,
      suggestions: [], // 联想建议数组
      searchHristoys: getItem('search-history') || [],
      isdeleteShow: false
    }
  },
  watch: {
    searchHristoys (newVal) {
      setItem('search-history', newVal)
    }
  },
  methods: {
    onSuggestion (item) {
      this.searchText = item
      this.isresultshow = true
    },
    heightlig (str) {
      return str.toLowerCase().replace(this.searchText.toLowerCase(), `<span style="color: red">${this.searchText}</span>`)
    },
    onSearch (q) {
      this.searchText = q
      const index = this.searchHristoys.indexOf(this.searchText)
      if (index !== -1) {
        this.searchHristoys.splice(index, 1)
      }
      this.searchHristoys.unshift(this.searchText)
      this.isresultshow = true
    },
    onSearchInput: debounce(async function () {
      const searchText = this.searchText
      if (!searchText) {
        return
      }
      const { data } = await getSuggestion(searchText)
      this.suggestions = data.data.options
      console.log(data)
    }, 200)
  },
  components: {
    SearchResult
  }
}
</script>

<style lang='less' scoped>
.search-container {
  padding-top: 54px;
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}

</style>
