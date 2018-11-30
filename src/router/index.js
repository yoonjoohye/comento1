import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main/Main.vue'
import Detail from '@/components/Detail/Detail.vue'
import lineClamp from 'vue-line-clamp'
import InfiniteScroll from 'v-infinite-scroll'
import vuejquery from 'vue-jquery'
import MQ from 'vue-match-media/src'
 
Vue.use(MQ)
Vue.use(vuejquery)
Vue.use(InfiniteScroll)
Vue.use(lineClamp, {})
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})
