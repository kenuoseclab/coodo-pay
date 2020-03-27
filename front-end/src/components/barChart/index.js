import React from "react";
// import { connect } from "react-redux";
import Chart from "../basicChart";
const chartData = {
  backgroundColor: "#fff",
  tooltip: {
    trigger: "axis"
  },
  // tab

  grid: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    containLabel: false
  },
  // x轴

  yAxis: [
    {
      type: "value",
      show: false,
      axisLabel: {
        formatter: "{value} mm"
      }
    }
  ]
};

const BarChart = props => (
  <Chart
    chartData={{
      ...chartData,
      series: [
        {
          type: "bar",
          data: props.ordersByPeriod,
          itemStyle: {
            normal: {
              // 设置柱状图颜色
              color: "#40a9ff",
              // 以下为是否显示，显示位置和显示格式的设置了
              label: {
                show: false,
                position: "top",
                formatter: "{c}"
                // formatter: '{b}\n{c}'
              }
            }
          },
          // 设置柱的宽度，要是数据太少，柱子太宽不美观~
          barWidth: 8
        }
      ],
      xAxis: [
        {
          type: "category", //分类
          show: false,
          data: props.period
        }
      ]
    }}
    height={"50px"}
    style={{ padding: 0 }}
  />
);

// const mapStateToProps = state => {
//   return {
//     salesByYear: state.yearData.salesByYear
//   };
// };

export default BarChart;
