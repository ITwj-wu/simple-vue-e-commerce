<template>
    <div>
        <div id="main"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
// 方法
function initEcharts () {
	// 新建一个promise对象
	let newPromise = new Promise((resolve) => {
		resolve()
	})
	//然后异步执行echarts的初始化函数
	newPromise.then(() => {
		//	此dom为echarts图标展示dom
		var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
        });
	})
}



export default {
    name:'Search',
    

    
    data(){
        return{

        };
    },
    created(){
        initEcharts ();
    }
};
</script>

<style scoped>
#main{
    width: 200px;
    height: 200px;
}
</style>