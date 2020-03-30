const SalesData = require("./models/salesData");
const Stats = require("./models/stats");
const Order = require("./models/order");
const mongoose = require("mongoose");
const { connection } = require("./config");
mongoose.connect(connection, { useNewUrlParser: true }, () => {
  console.log("连接成功");
});
mongoose.connection.on("error", console.error);

const setSalesData = async () => {
  let date = new Date();

  const todayOrders = await Order.find({
    date: date.toLocaleDateString()
  });
  // console.log(todayOrders);

  date.setDate(date.getDate() - 1);
  let salesData = await SalesData.findOne({
    date: date.toLocaleDateString()
  });
  // console.log(salesData);
  // console.log(salesData, "salesData");
  let number = salesData ? salesData.number : 0;
  number++;
  const sales = 0;
  todayOrders.forEach(item => {
    sales += item.price;
  });
  // console.log(sales, "sales");
  date = new Date();
  const { todayVisits } = await Stats.findOne({
    date: date.toLocaleDateString()
  });
  // console.log(todayVisits, "todayVisits");
  //新建销售记录
  const sale = await new SalesData({
    date: date.toLocaleDateString(),
    number: number,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: date.getDay(),
    sales: sales,
    orders: todayOrders.length,
    visits: todayVisits
  }).save();
  // console.log(sale);
};
const setStats = async () => {
  let date = new Date();

  let { totalSales, totalVisits, totalOrders, number } = await Stats.findOne({
    date: date.toLocaleDateString()
  });
  // console.log(
  //   totalSales,
  //   totalVisits,
  //   totalOrders,
  //   number,
  //   "totalSales, totalVisits, totalOrders, number"
  // );
  number++;
  //统计销售数据
  date.setDate(date.getDate() + 1);

  await new Stats({
    date: date.toLocaleDateString(),
    number: number,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: date.getDay(),
    totalSales: totalSales,
    totalVisits: totalVisits,
    totalOrders: totalOrders,
    todayVisits: 0
  }).save();

  // console.log(stat, "stat");
};
setSalesData();
setStats();
