<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading
    v-if="loading"
      class="loading"
      color="#1989fa"
      vertical
    >
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{article.title}}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div class="text">
            <p class="name">{{article.aut_name}}</p>
            <p class="time">{{article.pubdate | relativetime}}</p>
          </div>
        </div>
        <van-button
        class="follow-btn"
        :type="article.is_followed? 'default': 'info'"
        size="small"
        round
        v-if="!$store.state.user||articleID.aut_id!==$store.state.user.userId"
        @click="onFollow"
      >
      <!--   @click="" -->
          {{article.is_followed?'已关注':'+ 关注'}}
      </van-button>
      </div>
      <div class="markdown-body" v-html="article.content"></div>
      <!-- 文章评论 -->
      <van-list
        v-model="articlecomment.loading"
        :finished="articlecomment.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <commentItem
          v-for="(comment,index) in articlecomment.list"
          :key="index"
          :comment="comment"
        />
      </van-list>
      <!-- /文章评论 -->
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
        @click="loadArtical"
      >点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        class="comment-icon"
        name="comment-o"
        :info="articlecomment.totalConent"
      />
      <van-icon
        color="orange"
        :name="article.is_collected?'star':'star-o'"
        @click="onCollect"
      />
      <van-icon
        color="#e5645f"
        :name="article.attitude===1? 'good-job':'good-job-o'"
        @click="onLike"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import {
  getArticalShow,
  addCollect,
  deleteCollect,
  addAttitude,
  deleteAttitude,
  addFollow,
  deleteFollow,
  getComments
} from '@/api/artical'
import commentItem from './components/comment-item'

export default {
  name: 'ArticlePage',
  components: {
    commentItem
  },
  props: {
    articleID: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {},
      loading: true,
      articlecomment: {
        list: [],
        loading: false,
        finished: false,
        offset: null,
        totalConent: 0
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    // console.log(this.articleID)

    this.loadArtical()
  },
  mounted () {

  },
  methods: {
    async onLoad () {
      const articleComment = this.articlecomment
      // 1.请求获取数据
      const { data } = await getComments({
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.articleID, // 源id，文章id或评论id
        offset: articleComment.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: 10 // 每页大小
      })
      console.log(data)

      // 2.将数据添加到页表中
      const { results } = data.data
      articleComment.list.push(...results)
      articleComment.totalConent = data.data.total_count

      // 3.将加载更多的loading设置为false
      this.articlecomment.loading = false
      // 4.判断是否还有更多的数据
      if (results.length) {
        articleComment.offset = data.data.last_id
      } else {
        this.articlecomment.finished = true
      }
    },
    async loadArtical () {
      this.loading = true
      try {
        const { data } = await getArticalShow(this.articleID)
        this.article = data.data
        // this.is_collected = data.data.is_collected
        console.log(data)
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    async onCollect () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        if (this.article.is_collected) {
          await deleteCollect(this.articleID)
          this.article.is_collected = false
          this.$toast.success('取消收藏')
        } else {
          await addCollect(this.articleID)
          this.article.is_collected = true
          this.$toast.success('收藏成功')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    async onLike () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        if (this.article.attitude === 1) {
          await deleteAttitude(this.articleID)
          this.article.attitude = -1
          this.$toast.success('取消点赞')
        } else {
          await addAttitude(this.articleID)
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    async onFollow () {
      const authorId = this.article.aut_id
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        if (this.article.is_followed) {
          await deleteFollow(authorId)
          this.article.is_followed = false
          this.$toast.success('取消关注')
        } else {
          await addFollow(authorId)
          this.article.is_followed = true
          this.$toast.success('关注成功')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  padding: 46px 20px 100px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3A3A3A;
    }
    .author-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      height: 40px;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .text {
          line-height: 1.5;
          .name {
            margin: 0;
            font-size: 14px;
          }
          .time {
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>
