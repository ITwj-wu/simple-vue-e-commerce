<template>
    <div class="news">
        <Navbar title="新闻列表"></Navbar>
        <div class="newList">
            <ul>
                <li v-for="newl in newsList" :key="newl.id">
                    <router-link :to='{name:"detail", query:{id:newl.id}}'>
                        <div class="new_img">
                            <img :src="newl.img_url" alt="">
                        </div>
                        <div class="content">
                            <p class="title">{{newl.title}}</p>
                            <div class="new-desc">
                                <p class="summary">{{newl.desc}}</p>
                                <p>
                                    <span class="praise">点赞数:{{newl.click}}</span>
                                    <span class="time">发表时间:{{newl.add_time | converTime('YYYY-MMM-DD')}}</span>
                                </p>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  
    data(){
        return{
            newsList:[],
            
        }
    },
    created(){
        this.$axios.get('findAllNewList')
        .then(res=>{
            this.newsList = res.data;
        })
        .catch(err=>{
            console.log("新闻异常",err);
        })
    }
}
</script>

<style scoped>
.news{
    padding-bottom: 55px;
}
.newList{
    width: 100%;
    font-size: 12px;
}
.newList ul li{
    position: relative;
    border-bottom: 1px solid #cccccc;
}
.newList ul li a{
    display: block;
    width: 100%;
    height: 150px;
    color: #808080;
    display: flex;
    text-decoration: none;
}
.new_img{
    width: 30%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-self: center;
}
.newList ul li a img{
    width: 100px;
    height: 80px;
    border-radius: 3px;
    padding: 0 5px;
}
.content{
    width: 60%;
    padding: 25px;
}
.content .title{
    font-size: 15px;
    display: inline-block;
    color: #131f3c;
    letter-spacing: 0;
    padding-bottom: 7px;
    margin-top: 10px;
    
}


.new-desc span{
    color: #ff6700;
}

.summary{
    padding: 5px 0;
}
.time{
    margin-left: 30px;
}
</style>