<template>
  <div class="tmpl">
      <div class="photo-bottom">
          <ul>
              <li class="photo-comment">
                  <div>
                      <span>提交评论</span>
                      <span><a href="javascript:void(0)">返回</a></span>
                  </div>
              </li>
              <li class="txt-comment">
                  <textarea name="" id="" cols="50" rows="10" v-model="commentContent"></textarea>
              </li>
              <li>
                  <mt-button type="primary" size='large' @click='commentHandle'>评论</mt-button>
              </li>
              <li class="photo-comment">
                  <div>
                      <span>评论列表</span>
                      <span>44条评论</span>
                  </div>
              </li>
          </ul>
          <ul class="comment-list">
              <li v-for="comment in comments" :key="comment.id">
                  {{comment.userName}} : {{comment.content}} {{comment.addTime | relativeTime}}
              </li>
              
          </ul>
          <mt-button type="danger" size='large' @click="loadMore(page)">加载更多</mt-button>
      </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
    name:'Comment',
    props:['cid'],

    data () {
        return {
            comments:[],
            page:1,
            commentContent:''
        }
    },
     methods:{
        //提交评论 按钮的事件操作
        commentHandle(){
            // let data={'content':this.commentContent}
            this.$axios.post(`postComment/${this.cid}`)
            .then(res=>{
                //发表评论之后，清空评论框
                this.commentContent='';
                // 加载第一页的数据
                this.page = 1;
                this.loadMore();
            })
            .catch(err=>{
                console.log("评论失败",err);
            })
        },
        //加载更多 按钮的事件操作
        loadMore(page){
            this.$axios.get(`getComments/${this.cid}?pageIndex=${this.page}`, {
                params : {
                    "page":this.page, 
                }
            })
            .then(res=>{
                
                if(res.data.length===0){
                    this.$toast({
                        message: '没有更多评论',
                        duration:1000
                    })
                }
                if(page){
                    this.comments=this.comments.concat(res.data);
                }
                else{
                    //第一次加载
                    this.comments = res.data;
                }

                this.page++;
            })
            .catch(err=>{
                console.log("获取分页数据失败",err)
            })
        }
    },
    created(){
        //第一次加载
        this.loadMore();
    },
   
}
</script>

<style  scoped>
.tmpl{
    padding-bottom: 55px ;
}
.comment-list li{
    position: relative;
    padding-left: 20px;
    line-height: 40px;
}
.comment-list li::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -5px;       
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: gold;
}
.comment-list li:hover::before{
    background: darkgoldenrod;
}

</style>
