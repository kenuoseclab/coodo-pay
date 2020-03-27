const WechatPay = require("../models/wechatPay");
const Paypal = require("../models/paypal");
const Order = require("../models/order");
const jsonwebtoken = require("jsonwebtoken");
const { secret } = require("../config");
const { sendMail } = require("../utils/emailUtil");
class PaymentCtl {
  async updateWechat(ctx) {
    ctx.verifyParams({
      paymentName: { type: "string", required: true },
      accountID: { type: "string", required: true },
      bussinessId: { type: "string", required: true },
      signMethod: { type: "string", enum: ["MD5", "SHA256"], required: true },
      secretKey: { type: "string", required: true }
    });
    const wechatPay = await WechatPay.findByIdAndUpdate(ctx.params.id, {
      paymentName: ctx.request.body.paymentName.trim(),
      accountID: ctx.request.body.accountID.trim(),
      bussinessId: ctx.request.body.bussinessId.trim(),
      signMethod: ctx.request.body.signMethod,
      secretKey: ctx.request.body.secretKey.trim()
    });
    ctx.body = wechatPay;
  }
  async updatePaypal(ctx) {
    ctx.verifyParams({
      paymentName: { type: "string", required: true },
      clientID: { type: "string", required: true },
      exchangeRate: { type: "number", required: true },
      secretKey: { type: "string", required: true },
      mode: { type: "string", enum: ["生产模式", "沙盒模式"], required: true }
    });
    const paypal = await Paypal.findByIdAndUpdate(ctx.params.id, {
      paymentName: ctx.request.body.paymentName.trim(),
      clientID: ctx.request.body.clientID.trim(),
      exchangeRate: ctx.request.body.exchangeRate.trim(),
      secretKey: ctx.request.body.secretKey.trim(),
      mode: ctx.request.body.mode
    });
    ctx.body = paypal;
  }
  async fetchWechatPay(ctx) {
    ctx.body = await WechatPay.findOne();
  }
  async fetchPaypal(ctx) {
    ctx.body = await Paypal.findOne();
  }
}
module.exports = new PaymentCtl();
