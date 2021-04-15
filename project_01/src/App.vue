<template>
  <div id="app">
    <!-- 顶部栏 区域-->
    <mt-header fixed title="信息管理系统">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!-- 路由组件的出口 -->
     <transition name="fade" mode='out-in'>
      <router-view/>
     </transition>

                                                
    <div class="tabBar">
      <ul>
        <li v-for="(bar,index) in tabBarList" :key='bar.id'>
          <router-link :to="bar.routerName" exact @click.native='changeHash(index)' :class='{"link-active":index==currentIndex}'>
            <img :src="bar.imgSrc" alt="">
            <mt-badge size="small" color="red" v-if="index===2">{{pickNum}}</mt-badge>
            <p>{{bar.barName}}</p>
          </router-link> 
        </li>
      </ul>
    </div>
  </div>
</template>
 
<script>

let tabBarList=[
  {id:1,imgSrc:require('./assets/LINE.png'),barName:"首页",routerName:{name:'home'}},
  {id:2,imgSrc:require('./assets/Trello.png'),barName:"会员",routerName:{name:'vip'}},
  {id:3,imgSrc:require('./assets/容器.png'),barName:"购物车",routerName:{name:'cart'}},
  {id:4,imgSrc:require('./assets/安卓.png'),barName:"查找",routerName:{name:'search'}}
]
export default {
  name: 'App',
  data(){
    return{
      selected:'',
      tabBarList:tabBarList,
      currentIndex:0,
      // pickNum:0 // 底部栏购物的数量
    }
  },

  methods:{
    changeHash(index){
      this.currentIndex=index;
    }
  },

  created(){
    // //绑定事件
    // this.$bus.$on('sendPickNum',(data)=>{
    //   this.pickNum+=data;
    // });
    // //获取购物的所有商品数量
    // this.pickNum = GoodsToll.getTotalCount()
  },
  computed:{
    pickNum(){
      return this.$store.getters.getShopNum;
    }
  }

  // watch:{
  //   selected:function(newV,oldV){
  //     console.log(newV);
  //     console.log(this.selected);
  //     this.$router.push({name:newV});
  //   }
  // }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.tabBar{
    position:fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 55px;
    z-index: 10;
    background-color: white;
}

.tabBar ul{
    width: 100%;
    overflow: hidden;
}

.tabBar ul li{
    float: left;
    width: 25%;
    height: 55px;
    text-align: center;
    
}
.tabBar ul li a{
    display: inline-block;
    width: 100%;
    height: 100%;
    padding-top: 10px;
}

.tabBar ul li a.link-active{
  background-color: #3a9ab3;
}

.tabBar ul li p{
    font-size: 12px;
}
.tabBar ul li a img{
    width:25px;
    height:25px;
}
</style>
