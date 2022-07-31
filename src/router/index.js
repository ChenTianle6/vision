import Vue from 'vue';
import VueRouter from 'vue-router';

const SellerPage = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/views/SellerPage');
const TrendPage = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/views/TrendPage');
const MapPage = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/views/MapPage');
const RankPage = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/views/RankPage');
const HotPage = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/views/HotPage');
const StockPage = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/views/StockPage');
const ScreenPage = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/views/ScreenPage');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/screen',
  },
  {
    path: '/screen',
    component: ScreenPage,
  },
  {
    path: '/sellerpage',
    component: SellerPage,
  },
  {
    path: '/trendPage',
    component: TrendPage,
  },
  {
    path: '/mappage',
    component: MapPage,
  },
  {
    path: '/rankpage',
    component: RankPage,
  },
  {
    path: '/hotPage',
    component: HotPage,
  },
  {
    path: '/stockPage',
    component: StockPage,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
