<template>
  <div class="box4" ref="map">我是地图组件</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
//引入中国地图的JSON数据
import chinaJSON from './china.json'
//获取DOM元素
let map = ref()
//注册中国地图
echarts.registerMap('china', chinaJSON as any)
//阿里图标飞机svg参数
let planePath: string =
  'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
onMounted(() => {
  let mycharts = echarts.init(map.value)
  //设置配置项
  mycharts.setOption({
    //地图组件
    geo: {
      map: 'china', //中国地图
      roam: true, //鼠标缩放的效果
      //地图的位置调试
      left: 100,
      top: 200,
      right: 80,
      zoom: 1.2,
      bottom: 0,
      //地图上的文字的设置
      label: {
        show: true, //文字显示出来
        color: 'white',
        fontSize: 13,
        rotate: 20,
      },
      itemStyle: {
        //每一个多边形的样式
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgb(2,10,46)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgb(32,120,169)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        opacity: 0.7,
      },
      //地图高亮的效果
      emphasis: {
        itemStyle: {
          color: 'rgb(38,189,184)',
        },
        label: {
          fontSize: 40,
        },
      },
    },
    //布局位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'lines', //航线的系列
        data: [
          {
            fromName: '北京',
            toName: '上海',
            coords: [
              [116.4551, 40.2539],
              [121.4648, 31.2891],
            ],
          },
          {
            fromName: '上海',
            toName: '北京',
            coords: [
              [121.4648, 31.2891],
              [116.4551, 40.2539],
            ],
          },
          {
            fromName: '北京',
            toName: '广州',
            coords: [
              [116.4551, 40.2539],
              [113.5107, 23.2196],
            ],
          },
          {
            fromName: '广州',
            toName: '北京',
            coords: [
              [113.5107, 23.2196],
              [116.4551, 40.2539],
            ],
          },
          {
            fromName: '北京',
            toName: '成都',
            coords: [
              [116.4551, 40.2539],
              [103.9526, 30.7617],
            ],
          },
          {
            fromName: '成都',
            toName: '北京',
            coords: [
              [103.9526, 30.7617],
              [116.4551, 40.2539],
            ],
          },
          {
            fromName: '成都',
            toName: '新疆维吾尔自治区',
            coords: [
              [103.9526, 30.7617],
              [85.294711, 41.371801],
            ],
          },
          {
            fromName: ' 新疆维吾尔自治区',
            toName: '成都',
            coords: [
              [85.294711, 41.371801],
              [103.9526, 30.7617],
            ],
          },
        ],
        //开启动画特效
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol: planePath,
          symbolSize: 15,
        },
        lineStyle: {
          color: '#fff',
          width: 1,
          opacity: 0.6,
          curveness: 0.2,
        },
      },
    ],
  })
})
</script>

<style scoped></style>
