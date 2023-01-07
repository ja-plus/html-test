import * as echarts from 'https://cdn.bootcdn.net/ajax/libs/echarts/5.4.1/echarts.esm.min.js';
import { crossPoint } from '../../../js/utils/crossPoint.js';
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
          // console.log(sourceVal, sourceAxisInfo, targetAxisInfo);
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
    seriesIndex: 3,
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
      boundaryGap: false,
    },
  ],
  series: [
    {
      name: 'top-left',
      type: 'line',
      data: [2, 3, 4, 5, 6],
    },
    {
      name: 'top-left-series2',
      type: 'line',
      data: [12, 8, 7, 3, 1],
    },
    {
      name: 'top-left-color-area',
      type: 'custom',
      renderItem(params, api) {
        console.log(params, api);
        // api.coord 奖坐标，转化为像素点值。
        const points = [
          [0, 12],
          [1, 8],
          [2, 7],
          // [2.5, 4],
          [3, 3],
          // -----
          [3, 5],
          [2, 4],
          [1, 3],
          [0, 2],
        ].map(it => api.coord(it));
        let line1Points = points.slice(0, points.length / 2);
        let line2Points = points.slice(points.length / 2);
        let line1CrossPoints = line1Points.slice(-2);
        let line2CrossPoints = line2Points.slice(-2);
        console.log('points', line1CrossPoints, line2CrossPoints);
        // 计算焦点
        let crossPointVal = crossPoint({ points: line1CrossPoints }, { points: line2CrossPoints });
        console.log(crossPointVal, 'crossPointVal');
        points.splice(points.length / 2 - 1, 2);
        points.splice(points.length / 2, 0, crossPointVal);
        let color = api.visual('color');
        let test = crossPoint(
          {
            points: [
              [0, 0],
              [1, 1],
            ],
          },
          {
            points: [
              [0, 1],
              [1, 0],
            ],
          },
        );
        console.log(test, 'test');
        return {
          type: 'polygon',
          transition: ['shape'],
          shape: {
            points,
          },
          style: api.style({
            fill: color,
            stroke: echarts.color.lift(color, 0.1),
          }),
        };
      },
      clip: true,
      data: [
        [0, 12],
        [2, 8],
        [1, 3],
        [0, 2],
      ],
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
