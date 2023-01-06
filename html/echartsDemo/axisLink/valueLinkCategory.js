import * as echarts from 'https://cdn.bootcdn.net/ajax/libs/echarts/5.4.1/echarts.esm.min.js';
let myChart = echarts.init(document.getElementById('echarts'));
/** @type {Array<number>} */
const lcY = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
let option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  legend: {
    left: '5%',
    data: [
      {
        name: 'top-left',
      },
      {
        name: 'bottom-left',
      },
    ],
  },
  grid: [
    {
      // left-top
      top: '5%',
      left: '5%',
      width: '50%',
      height: '35%',
    },
    {
      // left-bottom
      top: '50%',
      left: '5%',
      height: '35%',
      width: '50%',
    },
    {
      // right-bottom
      top: '50%',
      right: '5%',
      height: '35%',
      width: '30%',
    },
  ],
  title: {
    left: 'center',
    text: 'Chart',
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
      restore: {},
      saveAsImage: {},
    },
  },
  axisPointer: {
    link: [
      {
        xAxisIndex: [0, 1],
      },
      {
        yAxisIndex: [1, 2],
        mapper(sourceVal, sourceAxisInfo, targetAxisInfo) {
          // category轴返回的sourceVal 为index
          console.log(sourceVal, sourceAxisInfo, targetAxisInfo);
          if (sourceAxisInfo.axisIndex === 1) {
            // console.log(Math.round(sourceVal));
            // category 轴返回的是index
            return lcY.indexOf(Math.round(sourceVal));
          } else if (sourceAxisInfo.axisIndex === 2) {
            return lcY[sourceVal];
          } else {
            return sourceVal;
          }
        },
      },
    ],
  },
  visualMap: {
    type: 'piecewise',
    show: false,
    dimension: 0,
    seriesIndex: 1,
    pieces: [
      {
        gt: 0,
        lt: 3,
        // min: 0,
        color: 'rgba(180, 0, 0, 0.4)',
      },
      {
        gt: 3,
        lt: 5,
        // max: 0,
        color: 'rgba(0, 180, 0, 0.4)',
      },
    ],
  },
  xAxis: [
    {
      gridIndex: 0,
      type: 'category',
      data: [1, 2, 3, 4, 5],
    },
    {
      gridIndex: 1,
      // type: 'value',
      type: 'category',
      data: [1, 2, 3, 4, 5],
    },
    {
      gridIndex: 2,
      type: 'value',
    },
  ],
  yAxis: [
    {
      gridIndex: 0,
      type: 'value',
    },
    {
      name: '利差',
      gridIndex: 1,
      type: 'value',
      max: lcY.at(-1),
      min: lcY[0],
      // type: 'category',
      // data: lcY,
    },
    {
      name: '利差',
      gridIndex: 2,
      type: 'category',
      data: lcY,
    },
  ],
  series: [
    {
      name: 'top-left',
      type: 'line',
      data: [12, 3, 4, 5, 6],
    },
    {
      name: 'bottom-left',
      xAxisIndex: 1,
      yAxisIndex: 1,
      type: 'line',
      areaStyle: {},
      data: [4, 2, 1, -1, -3],
    },
    {
      name: 'bottom-right-bar',
      xAxisIndex: 2,
      yAxisIndex: 2,
      type: 'bar',
      data: [2, 3, 4, 5],
    },
    {
      name: 'bottom-right-line',
      xAxisIndex: 2,
      yAxisIndex: 2,
      type: 'line',
      smooth: true,
      data: [1, 2, 3, 4, 5, 4, 3, 2, 1],
    },
  ],
};
myChart.setOption(option);
