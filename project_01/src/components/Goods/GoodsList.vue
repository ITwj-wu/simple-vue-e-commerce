<template>
  <div>
      <Navbar title="商品列表"></Navbar>
      <div class="page-loadmore">
          <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
              <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill='autoFill'>
                <ul class="page-loadmore-list">
                    <li v-for='goods in goodsList' :key='goods.id'>
                        <router-link :to="{name:'goods.detail',params:{id:goods.id}}">
                            <div class="con">
                                    <img :src="goods.imageUrl" alt="">
                                <div>
                                    <h3 class="title">{{goods.title}}</h3>
                                    <p class="desc">{{goods.desc}}</p>
                                    <p class="price">
                                        <span>{{goods.sellPrice}}元</span>
                                        <del>{{goods.marketPrice}}元</del>
                                    </p>
                                </div>
                                <div class="detial">
                                    <div class="hot" v-show="goods.stockNum<50">
                                        热卖中
                                    </div>
                                    <div class="count">
                                        仅剩{{goods.stockNum}}件
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
              </mt-loadmore>
          </div>
      </div>
  </div>
</template>

<script>
/**
 * mi-loadmore中的属性
 * 1.loadButtom函数
 * 2.机制loadButtom:buttom-all-loaded 默认为false,可以上拉 true禁止上拉
 * 3.auto-fill 默认为true，自动检测父容器loadButtom直到充满父容器
 * 4.pull 拉动未满足70px,drop达到70px loading加载中
 * 5.loadmore组件对象的onBottomLoaded()通知结束loading进入pull状态
 * 6.在组件中写ref在js中通过this.$ref.xxx获取的组件对象
 *   通过在普通标签写ref在js中通过this.$ref.xxx获取的dom对象
 * 
 * 7.上拉加载更多公式
 *  进入检测机制==》 可视的高度+页面卷起的高度=设备的高度
 */
export default {
    name:'GoodsList',
    data () {
        return {
            page:this.$route.params.page,
            goodsList:[],
            allLoaded:false,
            wrapperHeight:0,
            autoFill:false
        }
    },
    methods:{
        //上拉加载的事件
        loadBottom(){
            console.log('上拉加载');
            //通知状态发生改变
            //上拉加载数据
            this.loadGoodsByPage();
            this.$refs.loadmore.onBottomLoaded();
        },

        handleBottomChange(status){
          console.log(status);
        },
        
        loadGoodsByPage(){
            this.$axios.get(`getGoods/?pageindex=${this.page}`,{
                params : {
                    "page":this.page, 
                }
            })
            .then(res=>{

                if(res.data.length===0){
                    this.$toast({
                        message: '没有更多商品',
                        duration:1000
                    });

                    //如果为true，表示所有的数据都加载完成 禁止上拉
                    this.allLoaded = true;

                }
                
                if(this.page==1){
                    this.goodsList =  res.data;
                }else{
                    this.goodsList = this.goodsList.concat(res.data);
                }
                this.page++;
            })
            .catch(err=>{
                console.log("获取商品失败",err)
            })
        }
    },
    created(){
        //加载第一页的数据
        this.loadGoodsByPage();
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
}
</script>

<style  scoped>
.page-loadmore{
    padding-bottom: 55px;
    background-color:#eee;
    padding-top: 10px;
}
.page-loadmore-list{
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}
.page-loadmore-list li{
    background-color: white;
    width: 45%;
    float: left;
    margin: 0 0 10px 0;
    padding: 10px 0 10px 0;
    border-radius: 5px;
    text-align: center;
    border-top-color: #ffac13;
    margin-left: 10px;
}
.page-loadmore-list img{
    width: 150px;
    height: 150px;
    
   
}
.page-loadmore-wrapper{
    overflow: scroll;
}
.title{
    font-weight: lighter;
    color: #333;
    line-height: 30px
}

.desc{
    margin: 0 0 10px 10px;
    height: 18px;
    font-size: 12px;
    text-align: center;
    color: #b0b0b0;
    text-align: center;
}

.price{
    text-align: center;
    font-size: 14px;
    color: #ff6700;
}
del {
    color: #757575;
}
.detial{
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    color: tomato;
    width: 100%;
    font-size: 10px;
}
.hot{
    margin-left: 70px;
}
.count{
    margin-left: 5px;
}
</style>
