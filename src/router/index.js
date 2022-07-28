import Vue from 'vue'
import VueRouter from 'vue-router'

const SellerPage = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/views/SellerPage');

Vue.use(VueRouter)

const routes = [
  {
    path: '/sellerpage',
    component: SellerPage
  }
]

const router = new VueRouter({
  routes
})

export default router
