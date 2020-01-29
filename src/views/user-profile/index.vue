<template>
  <div class="user-profile">
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="头像" is-link @click="onSelteImg">
        <van-image
          width="30"
          height="30"
          round
          :src="user.photo"
        />
      </van-cell>
      <input type="file" hidden ref="file" @change="onFileChange">
      <van-cell title="昵称" :value="user.name" is-link @click="isEditShow=true" />
      <!-- <van-cell title="介绍" :value="user.gender" is-link /> -->
      <van-cell
        title="性别"
        :value="user.gender===0?'男':'女'"
        is-link
        @click="isEditGendershow=true"
      />
      <van-cell
        title="生日"
        :value="user.birthday"
        is-link
        @click="isEditBirthdayShow=true"
      />
    </van-cell-group>
    <!-- 更改用户昵称 -->
    <van-popup
      v-model="isEditShow"
      position="bottom"
    >
    <edit-name :name='user.name'
      @close='isEditShow=false'
      @confirm='onGenderSelete'
    ></edit-name>
    </van-popup>
    <!-- 更改用户性别 -->
    <van-action-sheet
      v-model="isEditGendershow"
      :actions="actions"
      @select="onGenderSelete"
      cancel-text="取消"
    />
    <!-- /更改用户性别 -->
    <!-- 更新用户生日 -->
    <van-popup
      v-model="isEditBirthdayShow"
      position="bottom"
    >
    <van-datetime-picker
      v-model="currentDate"
      type="datetime"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel='isEditBirthdayShow=false'
      @confirm="onBirthdayConfirm"
    />
    </van-popup>
    <!-- /更新用户生日 -->
    <!-- 预览图片 -->
     <van-image-preview
      v-model="isPreviewPhotoShow"
      :images="pewviewImages"
    >
      <van-nav-bar
        slot="cover"
        left-text="取消"
        right-text="确认"
        @click-left="isPreviewPhotoShow = false"
        @click-right="onPhotoConfirm"
      />
    </van-image-preview>
     <!-- /预览图片 -->
  </div>
</template>

<script>
import { getUserProfile, editUserProfile, editUserPhoto } from '@/api/user.js'
import EditName from './components/edit-nikename'
import moment from 'moment'

export default {
  name: 'UserProfile',
  components: {
    EditName
  },
  props: {},
  data () {
    return {
      user: {},
      isEditShow: false,
      isEditGendershow: false,
      actions: [
        { name: '男', value: 0 },
        { name: '女', value: 1 }
      ],
      isEditBirthdayShow: false,
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      isPreviewPhotoShow: false,
      pewviewImages: []
    }
  },
  computed: {
    file () {
      return this.$refs['file']
    }
  },
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    async onPhotoConfirm () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '保存中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const fd = new FormData()
        fd.append('photo', this.file.files[0])
        const { data } = await editUserPhoto(fd)
        this.user.photo = data.data.photo
        this.isPreviewPhotoShow = false
        this.$toast.success('保存成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    onFileChange () {
      const fileObj = this.file.files[0]
      // 获取文件数据
      const fileData = URL.createObjectURL(fileObj)
      // 将要预览的图片放到数组中
      this.pewviewImages = [fileData]

      this.isPreviewPhotoShow = true
    },
    async onSelteImg () {
      this.file.click()
    },
    async onBirthdayConfirm (value) {
      value = moment(value).format('YYYY-MM-DD')
      await this.saveProfile('birthday', value)
      this.user.birthday = value
      this.isEditBirthdayShow = false
    },
    async onGenderSelete ({ value }) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      await this.saveProfile('gender', value)
      this.user.gender = value
      this.isEditGendershow = false
    },
    async saveProfile (filed, value) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '保存中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        await editUserProfile({
          [filed]: value
        })
        this.$toast.success('保存成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    async onSave (name) {
      await this.saveProfile('name', name)
      this.user.name = name
      this.isEditShow = false
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

<style scoped lang="less">
/deep/ .van-image-preview__cover {
  top: unset;
  left: 0;
  bottom: 0;
  right: 0;
  .van-nav-bar {
    background: #181818;
    .van-nav-bar__text, .van-nav-bar__right {
      color: #fff;
    }
  }
}
</style>
