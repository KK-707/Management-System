<template>
  <div class="box2">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <!-- 图形图标的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
//引入echarts
import * as echarts from 'echarts'
let charts = ref()
//组件挂载完毕初始化图形图标
const colors = [
  '#F6C95C',
  '#EF7D33',
  '#1F9393',
  '#184EA1',
  '#81C8EF',
  '#9270CA',
]
onMounted(() => {
  let mycharts = echarts.init(charts.value)
  // 设置配置项
  mycharts.setOption({
    color: colors,
    tooltip: {
      trigger: 'item',
      formatter: '{b} <br/>占比：{d}%',
    },
    legend: {
      right: 30,
      top: 40,
      orient: 'vertical', //图例组件方向的设置
      textStyle: {
        color: 'white',
        fontSize: 14,
      },
    },
    series: [
      {
        name: '年龄比例',
        type: 'pie',
        radius: ['30%', '80%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: 200,
            name: '<10岁',
            percentage: '16%',
          },
          {
            value: 110,
            name: '10 ~ 18岁',
            percentage: '8%',
          },
          {
            value: 150,
            name: '18 ~ 30岁',
            percentage: '10%',
          },
          {
            value: 310,
            name: '30 ~ 40岁',
            percentage: '26%',
          },
          {
            value: 250,
            name: '40 ~ 60岁',
            percentage: '20%',
          },
          {
            value: 260,
            name: '>60岁',
            percentage: '20%',
          },
        ],
      },
    ],
    //调整图形图标的位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.box2 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: 260px;
  }
}
</style>
