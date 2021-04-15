<template>
    <div>
        <Navbar title="商品详情"></Navbar>
        <div class="goods-detail">
            <div class="outer-swiper">
                <div class="swiper">
                    <MySwiper :url='url' myHeight='300px' myImageHeight='300px'></MySwiper>
                </div>
            </div>
            <transition name="ball" @after-enter='afterEnter'>
                <div class="ball" v-if='isExist'></div>
            </transition>
            <div class="product-desc">
                <ul>
                    <li>
                        <span class="goods-title">{{goods.title}}</span>
                    </li>
                    <li class="price-li">
                        <del>￥{{goods.marketPrice}}</del>
                        销售价：<span>￥{{goods.sellPrice}}</span>
                    </li>
                    <li class="number-li">
                        购买数量：<span @click="subStract">-</span><span>{{pickNum}}</span><span @click="add">+</span>
                    </li>
                    <li c>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="ballHandler">加入购物车</mt-button>
                    </li>
                </ul>
                
            </div>
            
            <div class="desc">
                <span>商品参数</span><br>
                <span>商品货号：11283894</span><br>
                <span>库存情况：{{goods.stockNum}}件</span><br>
                <span>上架时间：{{goods.addTime}}</span>
            </div>
            <div class="btn">
                <mt-button type="primary" size="large" plain @click.native="showGoodsInfo">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click.native="showGoodsComment">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import GoodsToll from '../../GoodsTool'

export default {
    data () {
        return {
            id:this.$route.params.id,
            url:`getGoodsLunBoImages/${this.$route.params.id}`,
            goods:[],
            pickNum:1,
            isExist:false //默认小球隐藏
        }
    },
    methods:{
        showGoodsInfo(){
            //通过动态路由 进行路由的跳转
            this.$router.push({
                name:'goods.info',
                query:{id:this.$route.params.id}
            })
        },
        showGoodsComment(){
            this.$router.push({
                name:'goods.comment',
                query:{id:this.$route.params.id}
            })
        },
        //购买数量--
        subStract(){
            if(this.pickNum>1){
                this.pickNum--;
            }
        },
        //购买数量++
        add(){
            if(this.pickNum< this.goods.stockNum){
                this.pickNum++;
            }
        },
        ballHandler(){
            //让小球显示
            this.isExist=true;
            
        },
        afterEnter(){
            this.isExist=false;

            //触发公交车对象绑定的事件
            // this.$bus.$emit('sendPickNum',this.pickNum);

            this.$store.dispatch('addShopNumByAction',this.pickNum)
            //将添加到购物车的数据，保存到存储对象中
            GoodsToll.add({
                id:this.goods.id,
                num:this.$store.getters.getShopNum
            });

        }
    },
    created(){
        this.$axios.get(`getGoodsById/${this.id}`)
        .then(res=>{
            console.log(res.data);
            this.goods=res.data;
        })
        .catch(err=>{
            console.log("获取失败",err)
        })
    }
}
</script>

<style  scoped>
.ball-enter-active{
    animation: bounce-in 1s;
}
.ball-leave{
    opacity: 0;
}
@keyframes bounce-in{
    0%{
        transform:translate3d(0,0,0)
    }
    50%{
        transform:translate3d(140px,-50px,0);
    }
    75%{
        transform:translate3d(160px,30px,0);
    }
    100%{
        transform:translate3d(80px,300px,0);
    }
}
.goods-detail{
    padding-bottom: 55px;
}
.product-desc{
    position: relative;
    padding: 10px 0 10px 10px;
    margin: 5px;
    border: 1px solid #ccc;
}
.price-li{
    padding-top: 5px;
}
.price-li del{
    color: #ccc;
}
.price-li span{
    color: tomato;
}
.number-li{
    padding-bottom: 10px;
    padding-top: 5px;
}
.number-li span{
    border: 1px solid #ccc;
    padding: 3px 10px;
    border-radius: 3px;
}
.desc{
    padding: 10px 0 10px 10px;
    margin: 5px;
    border: 1px solid #ccc;
    color: #ccc;
    font-size: 13px;
}
.ball{
    position: absolute;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: rgb(228, 29, 29);
    margin-left: 150px;
    margin-top: 100px;
    z-index: 10;

}

.btn{
    padding: 10px;
    margin: 5px;
    border: 1px solid #ccc;
}

</style>
