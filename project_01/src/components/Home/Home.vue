<template>
    <div id='home'>
        <!-- 轮播图 -->
        <!-- <mt-swipe :auto="4000" style="height:250px;" class="swiper">
            <mt-swipe-item v-for="(item,index) in imgs" :key="index">
                <img :src="item.imageUrl" alt="">
            </mt-swipe-item>
        </mt-swipe> -->
        <MySwiper url='getLunBoImages' myHeight='250px' myImageHeight='250px'></MySwiper>

        <!-- 九宫格 -->
        <div class="list">
            <ul>
                <li v-for="gred in grids" :key='gred.id'>
                    <router-link :to="gred.router">
                        <img :src="gred.src" alt="">
                    </router-link>
                    <p>{{gred.title}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
var grids=[
    {id:1,src:require('../../assets/新闻资讯.png'),title:'新闻资讯',router:{name:'news.list'}},
    {id:2,src:require('../../assets/图文分享.png'),title:'图文分享',router:{name:'photo.list',params:{ categoryId:0 }}},
    {id:3,src:require('../../assets/商品展示.png'),title:'商品展示',router:{name:'goods.list',params:{ page:1 }}},
    {id:4,src:require('../../assets/资讯.png'),title:'资讯',router:{name:'news.list'}},
    {id:5,src:require('../../assets/联系我们.png'),title:'联系我们',router:{name:'news.list'}},
    {id:6,src:require('../../assets/留言反馈.png'),title:'留言反馈',router:{name:'news.list'}}
]
export default {
    data(){
        return{
            imgs:[],
            grids:grids
        }
    },
    // created(){
    //     this.$axios.get('jpa_findAll')
    //     .then(res=>{
    //         console.log(res.data)
    //         this.imgs = res.data.list;
    //     })
    //     .catch(err=>{
    //         console.log("轮播图数据异常",err);
    //     })
    // }
}
</script>

<style scoped>
.swiper img{
   width: 100%;
   height: 250px;
}
.list{
    width: 100%;
}

.list ul{
    display: flex;
    flex-wrap: wrap;
}

.list ul li{
    width: 33%;
    height: 100px;
    text-align: center;
    font-size: 14px;
    margin-top: 15px;
}
.list ul li a{
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 0 auto;
}
.list ul li a img{
    width:50px;
    height:50px;
}
</style>>

