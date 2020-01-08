<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="navlist" ></van-nav-bar>
    <!-- 登录表单 -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        required
        clearable
        label="手机号"
        placeholder="请输入手机名"
      />

      <van-field
        v-model="user.code"
        label="验证码"
        placeholder="请输入验证码"
        required
      >
       <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn-denglu">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>

  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async onLogin () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })
      // const user = this.user
      try {
        const res = await login(this.user)
        console.log(res)

        this.$toast.success('登录成功')
      } catch (err) {
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    }
  }

}
</script>

<style lang='less' scoped>
.navlist{
  background-color: #3195F9;
  color: white
}
.btn-denglu {
  padding: 27px 16px;
  // width: 100%;
  .van-button {
     width: 100%;
     background-color: #6DB4FA;
     border-radius: 5px;
  }
}
</style>
