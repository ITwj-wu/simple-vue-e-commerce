// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

import Moment from 'moment'

Vue.config.productionTip = false

import store from './store'


//引入Mint-ui 全部引入
import Mint from 'mint-ui'
Vue.use(Mint);
import 'mint-ui/lib/style.css'

// 引入preview的图片查看器
import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview) // 内部原型Vue.component('vue-preview',{})  全局挂载一个组件

//引入自己书写的全局的css样式
import '../static/css/global.css'

//配置公共的URL
Axios.defaults.baseURL= '/apis'

//配置axios
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = Axios;

//注册全局的轮播图组件
import MySwiper from '@/components/Common/MySwiper'
Vue.component(MySwiper.name,MySwiper);

//注册全局的导航栏组件
import Navbar from '@/components/Common/NavBar'
Vue.component(Navbar.name,Navbar);

//注册评论全局组件
import Comment from '@/components/Common/comment'
Vue.component(Comment.name,Comment);

//定义moment全局过滤器
Vue.filter('converTime',function(data,formatStr){
    return Moment(data).format(formatStr);
});
Vue.filter('relativeTime',function(data){
  return Moment(data).fromNow();
});
//设置中文显示
Moment.locale('zh-cn');

//过滤器 控制字数显示的过滤器
Vue.filter('controllShow',function(str,num){
  //如果当前字符串长度小于num 返回原值
  if(str.length<=num){
    return str;
  }
  //如果当前字符串长度大于num 则截取0~num-1位
  if(str.length>num){
    return str.substr(0,num-1)+'...'
  }
})

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  // 加载提示框
  Mint.Indicator.open({
    text:'玩命加载ing...'
  });
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  // 关闭加载提示框
  Mint.Indicator.close();
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

//将bus对象挂载到vue的原型上 
import EventBus from './EventBus'
Vue.prototype.$bus = EventBus;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 挂载store实例
  store,
  components: { App },
  template: '<App/>'
})



