// const path = require("path");
const SalesData = require("../models/salesData");
const Stats = require("../models/stats");
const faker = require("faker");
class HomeCtl {
  async getSalesData(ctx) {
    const salesData = await SalesData.find(ctx.request.query);
    // const sales = parseFloat(faker.finance.amount());
    // const visits = parseInt(faker.finance.amount());
    // const orders = parseFloat(faker.finance.amount());
    // //新建销售记录
    // let date = faker.date.past();
    // if (salesData.length < 365) {
    //   new SalesData({
    //     date: date.toLocaleDateString(),
    //     year: date.getFullYear(),
    //     month: date.getMonth() + 1,
    //     day: date.getDate(),
    //     week: date.getDay(),
    //     sales: sales,
    //     orders: orders,
    //     visits: visits
    //   }).save();
    // }
    ctx.body = salesData;
  }
  async createSalesData(ctx) {
    ctx.verifyParams({
      date: { type: "string", required: true },
      year: { type: "number", required: true },
      month: { type: "number", required: true },
      day: { type: "number", required: true },
      week: { type: "number", required: true },
      sales: { type: "number", required: true },
      visits: { type: "number", required: true },
      orders: { type: "number", required: true },
      number: { type: "number", required: true }
    });
    ctx.body = await new SalesData(ctx.request.body).save();
  }
  async getStats(ctx) {
    const stats = await Stats.find(ctx.request.query);
    // console.log(stats);
    // const totalSales = parseFloat(faker.finance.amount());
    // const totalVisits = parseInt(faker.finance.amount());
    // const totalOrders = parseFloat(faker.finance.amount());
    // const todayVisits = parseInt(faker.finance.amount());
    // //统计销售数据
    // let date = faker.date.past();
    // if (stats.length < 365) {
    //   new Stats({
    //     date: date.toLocaleDateString(),
    //     year: date.getFullYear(),
    //     month: date.getMonth() + 1,
    //     day: date.getDate(),
    //     week: date.getDay(),
    //     totalSales: totalSales,
    //     totalVisits: totalVisits,
    //     totalOrders: totalOrders,
    //     todayVisits: todayVisits
    //   }).save();
    // }
    ctx.body = stats;
  }
  async createStats(ctx) {
    ctx.verifyParams({
      date: { type: "string", required: true },
      year: { type: "number", required: true },
      month: { type: "number", required: true },
      day: { type: "number", required: true },
      week: { type: "number", required: true },
      totalSales: { type: "number", required: true },
      totalVisits: { type: "number", required: true },
      totalOrders: { type: "number", required: true },
      todayVisits: { type: "number", required: true },
      number: { type: "number", required: true }
    });
    // console.log(ctx.request.body);
    ctx.body = await new Stats(ctx.request.body).save();
  }
  async addVisits(ctx, next) {
    let date = new Date();
    const stat = await Stats.findOne({
      date: date.toLocaleDateString()
    });
    // console.log(stat);
    let todayVisits = stat.todayVisits || 0;
    todayVisits++;

    await Stats.findByIdAndUpdate(Stats._id, { todayVisits: todayVisits });
    await next();
  }
}
module.exports = new HomeCtl();
