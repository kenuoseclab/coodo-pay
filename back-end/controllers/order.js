const Order = require("../models/order");
const jsonwebtoken = require("jsonwebtoken");
const { secret } = require("../config");
const { sendMail } = require("../utils/emailUtil");
const { md5Pwd } = require("../utils/cryptoUtil");
class OrderCtl {
  async verifyCode(ctx) {
    // console.log(ctx.request.body, ctx.request.body.code);
    const order = await Order.findOne({ code: ctx.request.body.code });
    if (!order) {
      ctx.throw(401, "未找到您的订单信息");
    }
    await Order.updateOne(
      { code: ctx.request.body.code },
      { activation: "已激活" }
    );
    ctx.body = order;
  }
  async queryOrder(ctx) {
    if (ctx.request.query.password !== undefined) {
      // console.log(1);
      var order = await Order.findOne({
        email: ctx.request.query.email,
        password: md5Pwd(ctx.request.query.password)
      });
    } else {
      // console.log(2);
      var order = await Order.findOne(ctx.request.query);
    }
    if (!order) {
      ctx.throw(401, "未找到订单信息");
      ctx.body = null;
    }
    // console.log(3);
    ctx.body = order;
  }
  async fetchOrder(ctx) {
    // console.log("fetchOrder");
    const order = await Order.findOne({ orderId: ctx.params.id });
    if (!order) {
      ctx.throw(401, "未找到订单信息");
    }
    ctx.body = order;
  }
  async fetchAllOrder(ctx) {
    // console.log("fetchAllOrder");
    ctx.body = await Order.find(ctx.request.query);
  }
  async createOrder(ctx, next) {
    ctx.verifyParams({
      price: { type: "number", required: true },
      email: { type: "string", required: true },
      password: { type: "string", required: true },
      payment: { type: "string", required: true },
      productId: { type: "number", required: true },
      orderId: { type: "string", required: true },
      productName: { type: "string", required: true },
      levelName: { type: "string", required: true }
    });
    // const { name } = ctx.request.body;
    // console.log(JSON.stringify(ctx.request.body));
    let date = new Date();
    let code =
      Math.random()
        .toString(36)
        .substr(4)
        .toUpperCase() +
      Math.random()
        .toString(36)
        .substr(4)
        .toUpperCase();
    const order = await new Order({
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      code: code,
      activation: "未激活",
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: date.getDay(),
      price: ctx.request.body.price,
      email: ctx.request.body.email,
      ip: ctx.request.ip.substring(7),
      password: md5Pwd(ctx.request.body.password),
      payment: ctx.request.body.payment,
      productId: ctx.request.body.productId,
      orderId: ctx.request.body.orderId,
      productName: ctx.request.body.productName,
      levelName: ctx.request.body.levelName,
      paymentStatus: "未知",
      noInvoice: "noInvoice"
    }).save();
    // console.log(order);
    await next();
    // ctx.body = order;
  }
}
module.exports = new OrderCtl();
