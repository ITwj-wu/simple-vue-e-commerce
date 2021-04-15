let obj={}

// {key:value}
// key是商品到的id value商品的数量

//保存商品
obj.saveGoods = function(goodsList){
    window.localStorage.setItem('goodsList',JSON.stringify(goodsList))
}

// 获取所有商品
obj.getGoodsList = function(){
    return JSON.parse(window.localStorage.getItem('goodsList') || '{}')
}

// 增加商品
obj.add = function(goods){
    let goodsList = this.getGoodsList();
    if(goodsList[goods.id]){
        //有则追加
        goodsList[goods.id]+=goods.num;
    }
    else{
        goodsList[goods.id] = goods.num;
    }

    this.saveGoods(goodsList);
    
}

//购物车增加商品
obj.goodsUpAdd = function(goods){
    let goodsList = this.getGoodsList();
    goodsList[goods.id]+=1;
    this.saveGoods(goodsList);
}

// 购物车增加商品
obj.goodsUpsub = function(goods){
    let goodsList = this.getGoodsList();
    goodsList[goods.id]-=1;
    // this.saveGoods(goodsList);
    window.localStorage.setItem('goodsList1',JSON.stringify(goodsList))
}


//获取购物车的总数量
obj.getTotalCount = function(){
    let goodsList = this.getGoodsList();
    let values = Object.values(goodsList);
    let  sum = 0;
    values.forEach(val=>{
        sum +=val;
    })
    return sum;
}

// 删除
obj.removeGoods = function(id){
    let goodsList = this.getGoodsList();
    // window.localStorage.removeItem(goodsList[1][id]);
    console.log(goodsList);
    delete goodsList[id];
    console.log(goodsList);

    this.saveGoods(goodsList);
}

export default obj;