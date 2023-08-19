<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>99999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- 盒子将来echarts展示图形图标的节点 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
const people = ref('36090人')
const charts = ref()
onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    title: [
      {
        text: '预约量' + 60 + '%',
        left: 'center',
        top: '33%',
        textStyle: {
          color: '#fff',
          fontSize: '15px',
        },
      },
    ],
    grid: {
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
    },
    polar: {
      radius: ['85%', '95%'],
      center: ['50%', '50%'],
    },
    angleAxis: {
      max: 120,
      clockwise: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      startAngle: 188,
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        type: 'liquidFill', // 决定echart种类
        radius: '80%',
        center: ['50%', '50%'],
        data: [0.4, 0.4, 0.4], // data个数代表波浪数
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#35FAB6', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(40, 209, 247,0.3)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        outline: {
          borderDistance: 0,
          itemStyle: {
            borderWidth: 2,
            borderColor: '#31d8d5',
            shadowBlur: 20,
            shadowColor: '#50c1a7',
          },
        },
        label: {
          show: false,
        },
        backgroundStyle: {
          borderWidth: 1,
          // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 0,
                color: '#0D2648', // 0% 处的颜色
              },
              {
                offset: 0.8,
                color: '#0D2648', // 100% 处的颜色
              },
              {
                offset: 1,
                color: '#228E7D', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 20px;
    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: white;
      font-size: 20px;
      span {
        color: rgb(255, 165, 0);
      }
    }
  }
  .number {
    padding: 10px;
    margin-top: 30px;
    display: flex;
    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }
  .charts {
    width: 100%;
    height: 270px;
  }
}
</style>
