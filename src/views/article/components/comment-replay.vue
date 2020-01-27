<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar  class="reply-nav-bar" :title="`${comment.reply_count}条回复`">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('click-close')"
      />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <comment-item :comment="comment" />
    <!-- /当前评论项 -->
    <van-cell title="所有回复" />
    <!-- 评论的回复列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <comment-item
      v-for="(comment, index) in list"
      :key="index"
      :comment="comment"
     />
      </van-list>
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
        <div class="footer">
          <van-button
            class="write-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
          >写评论</van-button>
          <van-icon
            color="#e5645f"
            name="good-job"
          />
        </div>
    <!-- /底部 -->
    <!-- 评论回复 -->
        <van-popup
          v-model="isPostShow"
          position="bottom"
        >
          <!--
            value
            input
          -->
          <post-comment
            v-model="postMessage"
            @click-post="onPost"
          />
        </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'
import { getComments, addComments } from '@/api/artical'
import postComment from './post-comment'

export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    postComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Object, Number, String],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20,
      postComment: '',
      isPostShow: false, // 发布回复的显示状态
      postMessage: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost () {
      if (!this.postMessage) {
        return
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const { data } = await addComments({
          target: this.comment.com_id.toString(),
          content: this.postMessage,
          art_id: this.articleId.toString()
        })
        this.list.unshift(data.data.new_obj)
        this.isPostShow = false
        this.comment.reply_count++
        this.postMessage = ''
        this.$toast.success('发布成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('发布失败')
      }
    },
    async  onLoad () {
      const { data } = await getComments({
        type: 'c',
        source: this.comment.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })

      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }

  }
}
</script>

<style scoped lang='less'>
    .comment-reply {
      padding-bottom: 44px;
    }
    .reply-nav-bar {
      background: #fff;
      .van-icon, .van-nav-bar__title, .van-nav-bar__right {
        color: #333;
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
    }
</style>
