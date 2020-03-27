import React from "react";
// import { connect } from "react-redux";
import Chart from "../basicChart";
const chartData = {
  backgroundColor: "#fff",

  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "line"
    },
    padding: [5, 10]
  },
  // tab
  // legend: {
  //   top: 20,
  //   icon: "rect",
  //   itemWidth: 14,
  //   itemHeight: 5,
  //   itemGap: 13,
  //   right: "2%",
  //   textStyle: {
  //     fontSize: 12,
  //     color: "#57617B"
  //   }
  // },

  // 图表
  grid: {
    top: 0,
    left: "0",
    right: "0",
    bottom: "0",
    containLabel: false
  },
  // x轴

  yAxis: [
    {
      show: false,
      type: "value",
      name: "(%)",
      axisTick: {
        show: false
      },
      axisLabel: {
        margin: 0,
        textStyle: {
          fontSize: 0
        }
      }
    }
  ]
};

const AreaChart = props => (
  <Chart
    chartData={{
      ...chartData,
      series: [
        {
          // name: "A1",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 0,
          showSymbol: true,
          lineStyle: {
            normal: {
              width: 0
            }
          },
          areaStyle: {
            normal: {
              color: "#975FE4",
              opacity: 1
            }
          },
          itemStyle: {
            normal: {
              color: "#975FE4",
              // borderColor: "rgba(137,189,2,0.27)",
              borderWidth: 12
            }
          },
          data: props.visitsByPeriod
        }
      ],
      xAxis: [
        {
          show: false,
          type: "category", //分类
          boundaryGap: false,
          data: props.period,
          axisLabel: {
            margin: 0,
            textStyle: {
              fontSize: 0
            }
          }
        }
      ]
    }}
    height={"50px"}
    style={{ padding: 0 }}
    {...props}
  />
);

export default AreaChart;
