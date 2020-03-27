import moment from "moment";
export const monthAxis = () => {
  let axis = [];
  for (let i = 1; i <= 12; i++) {
    axis.push(`${i}月`);
  }
  return axis;
};
export const dayAxis = () => {
  let maxDay = moment().daysInMonth();
  let axis = [];
  for (let i = 1; i <= maxDay; i++) {
    axis.push(`${i}号`);
  }
  return axis;
};
export const weekAxis = () => {
  let axis = [];
  for (let i = 1; i <= 7; i++) {
    axis.push(`周${romanToChinese(i)}`);
  }
  return axis;
};
export const romanToChinese = num => {
  let Chinese = "";
  switch (num) {
    case 1:
      Chinese = "一";
      break;
    case 2:
      Chinese = "二";
      break;
    case 3:
      Chinese = "三";
      break;
    case 4:
      Chinese = "四";
      break;
    case 5:
      Chinese = "五";
      break;
    case 6:
      Chinese = "六";
      break;
    case 7:
      Chinese = "日";
      break;
    default:
      break;
  }
  return Chinese;
};
const xAxisOption = range => {
  return [
    {
      type: "category",
      show: true,
      data:
        range === "year"
          ? monthAxis()
          : range === "month"
          ? dayAxis()
          : weekAxis()
    }
  ];
};
const seriesOption = (catergory, range, data) => {
  // console.log(catergory, data);
  return [
    {
      name:
        catergory === "sales"
          ? "销售额"
          : catergory === "visits"
          ? "访问量"
          : "订单数",
      type: "bar",
      data: data,
      itemStyle: {
        normal: {
          // 设置柱状图颜色
          color: "#58AFFF",
          // 以下为是否显示，显示位置和显示格式的设置了
          label: {
            show: false,
            position: "top",
            formatter: "{c}"
            // formatter: '{b}\n{c}'
          }
        }
      },
      barWidth:
        range === "week"
          ? 40
          : range === "month"
          ? 15
          : range === "year"
          ? 30
          : null
    }
    // 设置柱的宽度，要是数据太少，柱子太宽不美观~
  ];
};
const barChartData = {
  backgroundColor: "#fff",
  // title: {
  //   top: 30,
  //   text: "柱状图",
  //   textStyle: {
  //     fontWeight: "normal",
  //     fontSize: 16,
  //     color: "#57617B"
  //   },
  //   left: "center"
  // },
  tooltip: {
    trigger: "axis"
  },
  grid: {
    top: "2%",
    left: "0%",
    right: "0.5%",
    bottom: "0%",
    containLabel: true,
    show: false
  },
  // x轴
  yAxis: [
    {
      type: "value",
      show: true,
      axisLabel: {
        formatter: "{value}"
      }
    }
  ]
};
export function chartData(catergory, range, data) {
  // console.log(data);
  // console.log({
  //   ...barChartData,
  //   xAxis: xAxisOption(range),
  //   series: seriesOption(catergory, data)
  // });

  // console.log(range, "range");
  return {
    ...barChartData,
    xAxis: xAxisOption(range),
    series: seriesOption(catergory, range, data)
  };
}
