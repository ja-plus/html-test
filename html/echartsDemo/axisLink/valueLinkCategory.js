import * as echarts from 'https://cdn.bootcdn.net/ajax/libs/echarts/5.4.1/echarts.esm.min.js';
import { crossPoint } from '../../../js/utils/crossPoint.js';
let myChart = echarts.init(document.getElementById('echarts'));
let crossPointStore = null;
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
      { name: 'top-left-series2' },
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
        // console.log(api.value(0));
        const areaPoints = api.value(0);
        // api.coord 将坐标，转化为像素点值。
        const points = areaPoints.map(it => api.coord(it));
        // console.log(api.coord([3, 5]), 'ddd', api.coord([3, 3]), 'sss');// 坐标是从左上角开始计算。
        let line1Points = points.slice(0, points.length / 2);
        let line2Points = points.slice(points.length / 2);
        let line1CrossPoints = line1Points.slice(-2);
        let line2CrossPoints = line2Points.slice(-2);
        // console.log('points', line1CrossPoints, line2CrossPoints);
        // 计算交点
        let crossPointResult = crossPoint({ points: line1CrossPoints }, { points: line2CrossPoints });
        // console.log(crossPointResult, 'crossPointVacrossPointResult');
        // 去除两个端点坐标，替换为交点坐标
        if (crossPointResult.isCrossInRange) {
          points.splice(points.length / 2 - 1, 2);
          points.splice(points.length / 2, 0, crossPointResult.crossPoint);
        }
        if (crossPointStore) {
          points.unshift(crossPointStore);
        }
        if (crossPointResult.isCrossInRange) {
          crossPointStore = crossPointResult.crossPoint;
        }

        // let testCrossPoint = crossPoint(
        //   {
        //     points: [
        //       [3, 5],
        //       [4, 6],
        //     ],
        //   },
        //   {
        //     points: [
        //       [4, 1],
        //       [3, 3],
        //     ],
        //   },
        // );
        // console.log('testCrossPoint', testCrossPoint);
        let color = api.visual('color');
        return {
          type: 'polygon',
          transition: ['shape'],
          shape: {
            points,
          },
          style: api.style({
            fill: params.dataIndex % 2 ? '#ff0000' : '#00ff00',
            // stroke: echarts.color.lift(color, 0.1),
          }),
        };
      },
      clip: true,
      data: [
        {
          value: [
            [
              [0, 12],
              [1, 8],
              [2, 7],
              [3, 3],
              // -----
              [3, 5],
              [2, 4],
              [1, 3],
              [0, 2],
            ],
          ],
        },
        {
          value: [
            [
              [3, 5],
              [4, 6],
              // -----
              [4, 1],
              [3, 3],
            ],
          ],
        },
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
      // barCategoryGap: 0,
      markPoint: {
        animation: false,
        silent: true,
        data: [
          {
            name: 'Max',
            value: '95.430058',
            xAxis: 0,
            yAxis: 5,
            symbolSize: [8, 14], // 使菱形压扁
            symbol: 'diamond',
            symbolOffset: [-10, 0],

            itemStyle: {
              color: '#C5D962',
              // opacity: 0.6,
            },
            label: {
              // fontFamily: 'ArialMT',
              align: 'right',
              show: true,
              height: 14,
              fontSize: 12,
              // lineHeight: 14,
              color: '#1B1B24',
              backgroundColor: 'rbga(197,217,98)',
              padding: [0, 4],
              borderRadius: [2, 0, 0, 2],
            },
          },
        ],
      },
      data: [
        2,
        3,
        4,
        5,
        4,
        {
          value: 3,
          itemStyle: {
            color: 'orange',
          },
          // label: { show: true },
        },
        2,
      ],
    },
    {
      name: 'bottom-right-line',
      xAxisIndex: 2,
      yAxisIndex: 2,
      type: 'line',
      smooth: true,
      data: [1, 2, 3, 4, 5, 4, 3, 2, 1],
    },
    {
      name: 'bottom-right-dash-split',
      xAxisIndex: 2,
      yAxisIndex: 2,
      type: 'bar',
      data: [[2, 7]],
      // barWidth: 1,
      itemStyle: {
        borderWidth: 1,
        borderType: 'dashed',
        borderColor: '#000',
        color: 'transparent',
      },
    },
  ],
};
myChart.setOption(option);
