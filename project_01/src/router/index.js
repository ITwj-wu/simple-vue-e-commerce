import Vue from 'vue'
import Router from 'vue-router'

// 按需加载引入模块
// 路由懒加载
const Home =()=>import( '@/components/Home/Home')
const Vip =()=>import( '@/components/Vip/Vip')
const Cart =()=>import( '@/components/Cart/Cart')
const Search =()=>import( '@/components/Search/Search')
const NewList =()=>import( '@/components/News/NewsList')
const Newsdetail =()=>import( '@/components/News/Newsdetail')
const PhotoList =()=>import( '@/components/Photo/PhotoList')
const PhotoDetail =()=>import( '@/components/Photo/PhotoDetail')
const GoodsList =()=>import( '@/components/Goods/GoodsList')
const GoodsDetail =()=>import( '@/components/Goods/GoodsDetail')
const GoodsComment =()=>import( '@/components/Goods/GoodsComment')



// 使用vue-router插件 Vue-prototype.$router=Router
Vue.use(Router)


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)}
  export default new Router({
    linkActiveClass:'link-active',
    routes: [
      {
        path:'/',
        redirect:'/home'
      },
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/vip',
        name: 'vip',
        component: Vip
      },
      {
        path: '/cart',
        name: 'cart',
        component: Cart
      },
      {
        path: '/search',
        name: 'search',
        component: Search
      },
      {
        path: '/news/list',
        name:'news.list',
        component: NewList
      },
      {
        path:'/news/detail',
        name:'detail',
        component:Newsdetail,
        props:{
          titleBar:'新闻详情'  //路由传参
        }
      },
      {
        path:'/photo/list/:categoryId',
        name:'photo.list',
        component:PhotoList
      },
      {
        path:'/photo/detail',
        name:'photo.detail',
        component:PhotoDetail
      },
      //商品列表
      {
        path:'/goods/list/:page',
        name:'goods.list',
        component:GoodsList
      },
      //商品详情
      {
        path:'/goods/detail/:id',
        name:'goods.detail',
        component:GoodsDetail
      },
      //商品图文介绍
      {
        path:'/goods/info/:id',
        name:'goods.info',
        component:Newsdetail,
        props:{
          titleBar:'商品图文介绍'
        }
      },
      //商品评论
      {
        path:'/goods/comment/:id',
        name:'goods.comment',
        component:GoodsComment
      }
    ]
})
