<template>
<!-- v-model="isPostshow" -->
    <div class="post-comment">
        <van-field
        class="post-field"
        rows="2"
        autosize
        :value="value"
        @input="$emit('input',$event)"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <!-- @click="onAddComments" -->
      <van-button
        size="small"
        type="primary"
        @click="$emit('click-post')"
        :disabled="!value"
      >发布</van-button>
    </div>

</template>

<script>
export default {
  data () {
    return {
      postMessage: ''
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  align-items: flex-end;
  padding: 10px;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
</style>
