<template>
  <div class="user-profile">
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image
          width="30"
          height="30"
          round
          :src="user.photo"
        />
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link @click="isEditShow=true" />
      <!-- <van-cell title="介绍" :value="user.gender" is-link /> -->
      <van-cell title="性别" :value="user.gender===0?'男':'女'" is-link />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>
    <van-popup
      v-model="isEditShow"
      position="bottom"
    >
    <edit-name :name='user.name'
      @close='isEditShow=false'
      @confirm='onSave'
    ></edit-name>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, editUserProfile } from '@/api/user.js'
import EditName from './components/edit-nikename'

export default {
  name: 'UserProfile',
  components: {
    EditName
  },
  props: {},
  data () {
    return {
      user: {},
      isEditShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    async onSave (name) {
      this.user.name = name
      await editUserProfile(this.user)
    },
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取数据失败')
      }
    }
  }
}
</script>

<style scoped></style>
