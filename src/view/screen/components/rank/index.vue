<template>
  <div class="box6">
    <div class="title">
      <p>热门景区排行</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <!-- 图形图标的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
//获取DOM节点
let charts = ref()
//组件挂载完毕
onMounted(() => {
  //一个容器可以同时展示多种类型的图形图标
  let mycharts = echarts.init(charts.value)
  //设置配置项
  mycharts.setOption({
    //标题组件
    title: {
      //主标题
      text: '景区排行',
      link: 'http://www.baidu.com',
      //标题的位置
      left: '50%',
      //主标题文字样式
      textStyle: {
        color: 'rgb(255, 165, 0)',
        fontSize: 20,
      },
      //子标题
      subtext: '各大景区排行',
      //子标题的样式
      subtextStyle: {
        color: 'rgb(255, 165, 0)',
        fontSize: 13,
      },
    },
    //x|y轴组件
    xAxis: {
      type: 'category', //图形图标在x轴均匀分布展示
    },
    yAxis: {},
    //布局组件
    grid: {
      left: 20,
      bottom: 20,
      right: 20,
    },
    //系列:决定显示图形图标是哪一种的
    series: [
      {
        type: 'bar',
        data: [10, 15, 30, 10, 50, 55, 90],
        //柱状图的:图形上的文本标签，
        label: {
          show: true,
          //文字的位置
          position: 'insideTop',
          //文字颜色
          color: '#fff',
          //文字大小
          fontSize: 20,
        },
        //是否显示背景颜色
        showBackground: true,
        backgroundStyle: {
          //底部背景的颜色
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgb(41,151,160)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgb(19,40,79)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        //柱条的样式
        itemStyle: {
          //柱条颜色
          color: function (data: any) {
            //给每一个柱条这是背景颜色
            let color = [
              '#F6C95C',
              '#EF7D33',
              '#1F9393',
              '#184EA1',
              '#81C8EF',
              '#9270CA',
              '#F6C95C',
            ]
            return color[data.dataIndex]
          },
        },
      },
      {
        type: 'line',
        data: [10, 15, 30, 10, 50, 55, 90],
        smooth: false, //平滑曲线
      },
    ],
    tooltip: {
      backgroundColor: 'rgba(50,50,50,0.7)',
    },
  })
})
</script>

<style scoped lang="scss">
.box6 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;
  .title {
    margin-left: 5px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: calc(100% - 30px);
  }
}
</style>
