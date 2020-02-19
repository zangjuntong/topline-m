<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="navlist" ></van-nav-bar>
    <!-- 登录表单 -->
    <ValidationObserver ref="form">
      <ValidationProvider name='手机号' rules="required|mobile" >
      <van-field
        v-model="user.mobile"
        required
        clearable
        label="手机号"
        placeholder="请输入手机名"
      />
    </ValidationProvider>
    <ValidationObserver name='验证码' rules="required|length:6|code" >
      <van-field
        v-model="user.code"
        label="验证码"
        placeholder="请输入验证码"
        required
      >
      <van-count-down
      v-if="isCountDownShow"
        @finish='isCountDownShow=false'
        :time="1000*60"
        format="ss s"
        slot="button"
      />
       <van-button
       v-if="!isCountDownShow"
       @click="sandCode"
        slot="button"
        size="small"
        type="primary">发送验证码</van-button>
      </van-field>
    </ValidationObserver>
    </ValidationObserver>
    <div class="btn-denglu">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>

  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user.js'
import { validate } from 'vee-validate'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      isCountDownShow: false,
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
    async sandCode () {
      const { mobile } = this.user
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        // console.log(validateResult.errors)

        return
      }
      try {
        this.isCountDownShow = true
        await getSmsCode(mobile)
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('请勿频繁操作')
          return
        }
        this.$toast('发送失败')
      }
    },
    async onLogin () {
      const success = await this.$refs.form.validate()
      if (!success) {
        setTimeout(() => {
          const errors = this.$refs.form.errors
          const item = Object.values(errors).find(item => {
            return item[0]
          })
          this.$toast(item[0])
        }, 100)
        return
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })
      // const user = this.user
      try {
        const res = await login(this.user)
        this.$store.commit('setUser', res.data.data)
        console.log(res)
        this.$toast.success('登录成功')
        const redirect = this.$route.query.redirect || '/'
        this.$router.push(redirect)
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
