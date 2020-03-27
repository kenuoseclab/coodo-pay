const Alipay = require("../models/alipay");
const WechatPay = require("../models/wechatPay");
const Paypal = require("../models/paypal");
const Email = require("../models/email");
const Setting = require("../models/setting");
const Stats = require("../models/stats");
const SalesData = require("../models/salesData");
const Order = require("../models/order");
const User = require("../models/user");

class initUtil {
  async initData() {
    await Setting.deleteMany({}, () => {
      console.log("delete success");
    });
    const alipay = await Alipay.find();
    if (alipay.length === 0) {
      await Alipay({
        paymentName: "支付宝",
        appId: " ",
        publicKey: " ",
        secretKey: " ",
        notifyUrl: " "
      }).save();
    }
    const paypal = await Paypal.find();
    if (paypal.length === 0) {
      await Paypal({
        paymentName: "Paypal",
        clientID: " ",
        exchangeRate: 7,
        secretKey: " ",
        mode: "生产模式"
      }).save();
    }
    const wechatPay = await WechatPay.find();
    if (wechatPay.length === 0) {
      await WechatPay({
        paymentName: "微信支付",
        accountID: " ",
        bussinessId: " ",
        signMethod: "MD5",
        secretKey: " "
      }).save();
    }
    const email = await Email.find();
    if (email.length === 0) {
      await Email({
        mailAddress: " ",
        mailPassword: " ",
        sendName: " "
      }).save();
    }
    const setting = await Setting.find();
    if (setting.length === 0) {
      await Setting({
        themeOption: "default",
        isFirst: "yes",
        version: 1.1
      }).save();
    }

    const stats = await Stats.find();
    if (stats.length === 0) {
      let date = new Date();
      await Stats({
        date: date.toLocaleDateString(),
        number: 0,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        week: date.getDay(),
        totalSales: 0,
        totalVisits: 0,
        totalOrders: 0,
        todayVisits: 0
      }).save();
    }
    let date = new Date();
    const stat = await Stats.findOne({ date: date.toLocaleDateString() });
    if (!stat) {
      let date = new Date();
      await Stats({
        date: date.toLocaleDateString(),
        number: 0,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        week: date.getDay(),
        totalSales: 0,
        totalVisits: 0,
        totalOrders: 0,
        todayVisits: 0
      }).save();
    }

    const salesData = await SalesData.find();
    if (salesData.length === 0) {
      let date = new Date();
      date.setDate(date.getDate() - 1);
      await SalesData({
        date: date.toLocaleDateString(),
        number: 0,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        week: date.getDay(),
        sales: 0,
        orders: 0,
        visits: 0
      }).save();
    }
  }
}
module.exports = new initUtil();
