import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'tab-bar',
    component: () => import('@/views/tab-bar'),
    children: [
      {
        path: '',
        component: () => import('@/views/home')
      }, {
        path: 'qa',
        component: () => import('@/views/qa')
      }, {
        path: 'viedo',
        component: () => import('@/views/viedo')
      }, {
        path: 'my',
        component: () => import('@/views/my')
      }
    ]
  }, {
    path: '/search',
    component: () => import('@/views/search')
  }, {
    path: '/article/:articleID',
    component: () => import('@/views/article'),
    props: true
  }, {
    path: '/user/profile',
    component: () => import('@/views/user-profile')
  }, {
    path: '/user/chat',
    component: () => import('@/views/user-chat')
  }, {
    path: '/my-article/:type?',
    component: () => import('@/views/userarticles'),
    props: true
  }, {
    // 收藏列表
    path: '/my-article/collect',
    component: () => import('@/views/userarticles')
  }, {
    // 历史列表
    path: '/my-article/history',
    component: () => import('@/views/userarticles')
  }
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
