<template>
    <div>
        <Navbar title="购物车"></Navbar>
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for="(shop,index) in shopcart" :key="shop.id">
                    <mt-switch v-model="shop.isSelect"></mt-switch>
                    <img :src="shop.imageUrl" alt="">
                    <div class="pay-calc">
                        <p>{{shop.title}}</p>
                        <div class="calc">
                            <p>￥{{shop.sellPrice}}</p>
                            <span @click="subStract(shop)">-</span>
                            <span>{{shop.num}}</span>
                            <span @click="add(shop)">+</span>
                            <a href="javascript:void(0)" @click="del(shop,index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费)</p>
                <span>已选择商品{{payment.count}}件，总价￥{{payment.total}}元 </span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="normal">去结算</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import GoodsTool from '@/GoodsTool'
export default {
    name:'Cart',  
    data(){
        return{
            shopcart:[],
            sumPrie:0
        };
    },
    created(){
        console.log(GoodsTool.getGoodsList());
        let goodsList = GoodsTool.getGoodsList();
        let ids = Object.keys(goodsList).join(',')
        this.$axios.get(`goods/getshopcarlist/${ids}`)
        .then(res=>{
            this.shopcart = res.data.list;

            //vue会将shopCart中对象的所有属性进行监视，完成响应式

            /**
                Object.defineProperty(this,'shopCart',{
                    set:function(){
                        判断shopcart中是否有属性
                    }
                })
             */
           
            
            // 给数组的元素添加属性
            for(var i=0;i<this.shopcart.length;i++){
                let shop = this.shopcart[i];
                let num = goodsList[shop.id];
                if(num){

                    //如果数据不完整的情况下要添加属性，就需要手动通知vue完成响应式==》双向数据绑定
                    this.$set(shop,'num',num);
                    this.$set(shop,'isSelect',true);
                }
            }

        })
        .catch(err=>{
            console.log('获取购物车商品失败',err);
        })
    },
    methods:{
        //购买数量--
        subStract(shop){
            if(shop.num>1){
                shop.num--;
                this.$store.dispatch('addShopNumByAction',-1)
                GoodsTool.goodsUpsub(shop);
            }
            
        },
        //购买数量++
        add(shop){
            shop.num++;
            GoodsTool.goodsUpAdd(shop);
            this.$store.dispatch('addShopNumByAction',1)
        },
        del(shop,index){
            //删除数组的元素
            this.shopcart.splice(index,1);
            //删除shop
            GoodsTool.removeGoods(shop.id);
        }
    },
    computed:{
        payment(){
            //默认只有getter方法

            let total = 0; // 总钱数
            let count = 0; // 总数量

            this.shopcart.forEach(shop=>{
                if(shop.isSelect){
                    count+=shop.num;
                    total+=shop.num*shop.sellPrice;
                }
            })
            this.$store.dispatch('changeShopNumByAction',count);
            return{
                total,count
            }
        }
    },
     beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    let res = confirm('确定离开吗？？？');
    if(res){
        //保存用户编辑数据
        let obj={}
        this.shopcart.forEach((shop)=>{
            obj[shop.id] = shop.num
        })
        GoodsTool.saveGoods(obj);
        next();
    }else{
        next(false); //取消导航
    }
    
  }
};
</script>

<style scoped>
.p-list{
    border: 1px solid #ccc;
    border-radius:5px;
    margin-bottom: 5px;
    padding-left: 20px;
}
.p-list img{
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
}
.calc span{
    border: 1px solid #ccc;
    
    /* border-radius: 3px; */
}
.show-price{
    padding-bottom: 55px;
    border: 1px solid #ccc;
    border-radius:5px;
}
</style>