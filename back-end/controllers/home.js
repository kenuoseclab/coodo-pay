// const path = require("path");
const SalesData = require("../models/salesData");
const Stats = require("../models/stats");
const faker = require("faker");
class HomeCtl {
  async getSalesData(ctx) {
    const salesData = await SalesData.find(ctx.request.query);

    ctx.body = salesData;
  }
  // async createSalesData(ctx) {
  //   ctx.verifyParams({
  //     date: { type: "string", required: true },
  //     year: { type: "number", required: true },
  //     month: { type: "number", required: true },
  //     day: { type: "number", required: true },
  //     week: { type: "number", required: true },
  //     sales: { type: "number", required: true },
  //     visits: { type: "number", required: true },
  //     orders: { type: "number", required: true },
  //     number: { type: "number", required: true }
  //   });
  //   ctx.body = await new SalesData(ctx.request.body).save();
  // }
  async getStats(ctx) {
    const stats = await Stats.find(ctx.request.query);

    ctx.body = stats;
  }
  // async createStats(ctx) {
  //   ctx.verifyParams({
  //     date: { type: "string", required: true },
  //     year: { type: "number", required: true },
  //     month: { type: "number", required: true },
  //     day: { type: "number", required: true },
  //     week: { type: "number", required: true },
  //     totalSales: { type: "number", required: true },
  //     totalVisits: { type: "number", required: true },
  //     totalOrders: { type: "number", required: true },
  //     todayVisits: { type: "number", required: true },
  //     number: { type: "number", required: true }
  //   });
  //   // console.log(ctx.request.body);
  //   ctx.body = await new Stats(ctx.request.body).save();
  // }
  async addVisits(ctx, next) {
    let date = new Date();
    const stat = await Stats.findOne({
      date: date.toLocaleDateString()
    });
    // console.log(stat);
    let todayVisits = stat.todayVisits || 0;
    todayVisits++;

    await Stats.findByIdAndUpdate(stat._id, { todayVisits: todayVisits });
    await next();
  }
}
module.exports = new HomeCtl();
