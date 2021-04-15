<template>
    <div>
        <div>
            <Navbar title="图文列表"></Navbar>
            <div id="category-list">
                <ul id="category">
                    <li v-for="(category,index) in categorys" :key="category.id" @click="categoryHandler(category.id,index)">
                        <a href="javaScript:void(0)" :class='{"active":index==currentIndex}'>{{category.category}}</a>
                    </li>
                </ul>
            </div>
            <div class="photo-list">
                <ul>
                    <li v-for="image in imageList" :key="image.id">
                        <router-link :to="{name:'photo.detail',query:{id:image.id}}">
                            <!-- 图片懒加载 mint_ui的lazy load -->
                            <img v-lazy="image.imageUrl">
                            <p>
                                <span>{{image.title}}</span>
                                <br>
                                <span>{{image.describe}}</span>
                            </p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        categorys:[],
        imageList:[],
        currentIndex:0
    }
  },
  methods:{
      categoryHandler(id,index){
          //动态路由跳转
          this.$router.push({name:"photo.list",params:{categoryId:id}})
          this.currentIndex=index;
      },
      loadImgByCategoryId(id){
          this.$axios.get(`findAllImage/${id}`)
          .then(res=>{
              this.imageList = res.data;
              if(this.imageList.length==0){
                this.$toast({
                    message: '没有图片',
                    iconClass: 'iconfont icon-shiabai',
                    duration:1000
                });
              }
          })
          .catch(err=>{
              console.log("图片加载出错",err);
          })
      }
      
  },

  //路由进入之前
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
     next(vm => {
    // 通过 `vm` 访问组件实例
    vm.loadImgByCategoryId(to.params.categoryId);
    })
  },
 
 //路由更新之前
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log(to);
    this.loadImgByCategoryId(to.params.categoryId);
    next();
  },

  created(){
      //获取图文分享的分类信息 小导航
      this.$axios.get("findAllCategory")
      .then(res=>{
        this.categorys = res.data;
        this.categorys.unshift({"id":0,"category":"全部"})
      })
      .catch(err=>{
        console.log("分类信息获取失败",err);
      })
  }
}
</script>

<style  scoped>
#category {
    width:100%;
    display: inline;
    white-space: nowrap;
    overflow-x:scroll;
    float:left;
    overflow-y:hidden;
}

#category li{
    display:inline-block;
    height:30px;
    padding-left:10px;
    padding-right: 10px;
}

#category-list ul li a.active{
    color: crimson;
}
.photo-list{
    width: 100%;
}
.photo-list img{
    width: 100%;
    height: 400px;
}

image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>
