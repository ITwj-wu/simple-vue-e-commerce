<template>
  <div class="detail">
      <Navbar :title='titleBar'></Navbar>
      <div class="item">
          <h3>{{content.title}}</h3>
          <div>
              <span>{{content.click}}</span>
              <span>分类：民生经营</span>
              <span>时间：{{content.add_time | converTime('YYYY-MMM-DD')}}</span>
          </div>
      </div>
      <div class="divider"></div>
      <div class="detail-content" v-html='content.content'></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        id:0,
        content:{}
    }
  },
  props:['titleBar'],

  created(){
      this.id = this.$route.query.id;
      this.$axios.get(`/newsContent/${this.id}`)
      .then(res=>{
          this.content = res.data[0];
      })
      .catch(err=>{
          console.log('新闻详情异常',err);
      })
  }
}
</script>

<style  scoped>

</style>
