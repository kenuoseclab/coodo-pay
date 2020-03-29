const SalesData = require("../models/salesData");
const Stats = require("../models/stats");
const Order = require("../models/order");
const CronJob = require("cron").CronJob;

const setSalesData = async () => {
  let date = new Date();

  const todayOrders = await Order.find({
    date: date.toLocaleDateString()
  });
  date.setDate(date.getDate() - 1);
  let salesData = await SalesData.findOne({
    date: date.toLocaleDateString()
  });
  let number = salesData.number || 0;
  number++;
  const sales = 0;
  todayOrders.forEach(item => {
    sales += item.price;
  });
  date = new Date();
  const { todayVisits } = await Stats.findOne({
    date: date.toLocaleDateString()
  });
  //新建销售记录
  new SalesData({
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
};
const setStats = async () => {
  let date = new Date();
  date.setDate(date.getDate() - 1);
  let { totalSales, totalVisits, totalOrders, number } = await Stats.findOne({
    date: date.toLocaleDateString()
  });

  number++;
  //统计销售数据
  date = new Date();
  new Stats({
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
};
class CronJobs {
  salesCron() {
    const salesJob = new CronJob("01 59 23 * * *", setData, null, true);

    salesJob.start();
  }
  statsCron() {
    const statsJob = new CronJob("01 00 00 * * *", setStats, null, true);
    statsJob.start();
  }
}
module.exports = new CronJobs();
