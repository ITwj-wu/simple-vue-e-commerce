<template>
  <div>
    <Navbar title="图文详情"></Navbar>
    <div class="photo-detail">
      <!-- 图文标题 -->
      <div class="photo-header">
        <p>{{imageInfo.title}}</p>
        <span>发起日期：{{imageInfo.time | converTime('YYYY-MM-DD')}}</span>
        <span>浏览次数：{{imageInfo.click}}</span>
        <span>分类：民生经济</span>
      </div>
      <!-- 图片缩略图 -->
      <!-- <div class="image-list">
        <ul>
          <li v-for="image in images" :key="image.id">
            <a href="javascript:void(0)">
              <img :src="image.imageUrl">
            </a>
          </li>
        </ul>
      </div> -->

      <!-- 图片缩略图 -->
      <vue-preview :slides='images' ></vue-preview>

      <!-- 图文描述 -->
      <div class="photo-desc">
          <p>{{imageInfo.info}}</p>
      </div>
      
      <!-- 使用评论组件 -->
      <Comment :cid='$route.query.id'></Comment>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        imageInfo:[],
        images:[]
    }
  },
  created(){
    let id = this.$route.query.id
    // 如果使用普通函数声明 当前this为undefined 建议使用箭头函数 改变当前this的指向
    
    // 获取图文详情
    var getImageInfo=()=>{
        return this.$axios.get('getImageInfo/'+id);
    }

    // 获取缩略图
    var getImages=()=>{
        return this.$axios.get('getInfoImages/'+id);
    }

    this.$axios.all([getImageInfo(), getImages()])
        .then(this.$axios.spread((acct, perms)=>{
        // 两个请求现在都执行完成
        this.imageInfo = acct.data;
        this.images = perms.data;
        
        this.images.forEach((item,index)=>{
            item.src = item.imageUrl, // 大图
            item.msrc = item.imageUrl, // 小图
            item.w = 600, // 大图的宽
            item.h = 600  // 大图的高
        })
    }));
  }
}
</script>

<style  scoped>
.photo-header p{
  color: blue;
  font-size: 20px;
}
.photo-header span{
  color: brown;
  font-size: 15px;
}
.image-list{
  width: 100%;
}
.image-list ul{
  display: flex;
  flex-wrap: wrap;
}
.image-list ul li{
    width: 33%;
    height: 100px;
    text-align: center;
    font-size: 14px;
    margin-top: 15px;
}
.image-list img{
  width: 80px;
  height: 100px;
}
.photo-desc{
  padding-top: 20px;
  color: aquamarine;
  font-size: 20px;
}
</style>
