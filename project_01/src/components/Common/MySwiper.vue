<template>
  <div>
        <mt-swipe :auto="4000" :style="{height:myHeight}" class="swiper"> 
            <mt-swipe-item v-for="(item,index) in imges" :key="index">
                <img :src="item.imageUrl || item.imageSrc" alt="" :style="{height:myImageHeight}">
            </mt-swipe-item>
        </mt-swipe>
  </div>
</template>

<script>
export default {
    name:'MySwiper',
    data () {
        return {
            imges:[]
        }
    },
    props:['url','myHeight','myImageHeight'],
    
    created(){
        this.$axios.get(this.url)
        .then(res=>{
            this.imges = res.data;
        })
        .catch(err=>{
            console.log("轮播图数据异常",err);
        })
    }
}
</script>

<style  scoped>
.swiper img{
   width: 100%;
   height: 250px;
}
</style>
