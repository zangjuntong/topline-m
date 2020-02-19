// axios请求
import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
import router from '@/router'

// axios.create 方法：复制一个 axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    return {}
  }
}]
// 请求拦截器
request.interceptors.request.use(function (config) {
  // config 请求配置对象，我们可以通过修改 config 来实现统一请求数据处理
  const { user } = store.state

  // 统一添加 token
  if (user) {
    // config.headers 获取操作请求头对象
    // Authorization 是后端要求的字段名称
    // 数据值后端要求提供：Bearer token数据
    //    注意：Bearer 后面有个空格
    // 老师，为啥？后端要求的
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  // 当请求失败的时候会进入这个响应拦截中的错误处理函数
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response && error.response.status === 401) {
    // 1. 如果没有 refresh_token，则直接跳转登录页
    const user = store.state.user
    if (!user || !user.refresh_token) {
      redirectLogin()
      return
    }

    // 2. 如果有，则请求更新 token
    try {
      // 这里为啥使用 axios 请求刷新 token？
      // 刷新 token 的接口要求把 refresh_token 放到请求头中，名字叫 Authorization
      // 如果我们使用 request 请求刷新 token，则会走 request 的请求拦截器，request 的请求拦截器中添加的是 token，不是 refresh_token
      // 如果 request 刷新 token 失败了，还会进入 request 自己的响应拦截器中，在这里会执行请求刷新 token 的操作
      // 而我们需要当刷新 token 失败之后直接跳转登录页，不需要在执行任何的处理了。
      // 所以：request 请求拦截器处理和响应拦截器不符合我们请求刷新 token 的要求，除非你在里面继续更多的判断逻辑
      const { data } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })

      // 响应结果：{ message: ok, token: 'xxxxxxxxxxxxxx' }
      // user: { id, token, refresh_token }
      // 修改容器数据必须通过 mutation 来修改

      // 3. 如果刷新 token 成功了，则把新的 token 更新到容器中
      store.commit('setUser', {
        ...user, // { id, token, refresh_token }
        token: data.data.token // 更新 token
      })

      // 4. 把之前失败的请求继续发出去
      // error.config 获取到的是本次请求相关的配置对象，其中包含它的 method、url 等信息
      console.log(error.config)

      // 把本次因为 token 无效过期的失败请求重新发送
      // 注意：这里使用 request，还是走原来的请求拦截器、响应拦截器
      // 注意：使用 return 把请求结果继续返回，真正的请求的代码才能拿到
      return request(error.config)
    } catch (err) {
      console.log('刷新 token 失败', err)
      redirectLogin()
    }
  }
  return Promise.reject(error)
})
function redirectLogin () {
  router.push({
    name: 'login',
    // query 参数会以 ?key=value&key=value 的格式添加到 url 后面
    query: {
      // 这里使用查询参数把要跳转回来的路由地址传递给了登录页面
      // router.currentRoute 就是当前路由对象，好比我们在组件中的 this.$route
      // 当前路由对象的fullPath 就是当前路由的路径
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request
