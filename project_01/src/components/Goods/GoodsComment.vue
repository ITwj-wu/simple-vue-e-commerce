<template>
  <div>
      <Navbar title="商品详情"></Navbar>
      <Comment :cid='$route.query.id'></Comment>
  </div>
</template>

<script>
export default {

  data () {
    return {
    }
  }
}
</script>
<style  scoped>

</style>
