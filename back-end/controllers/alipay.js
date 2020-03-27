const Alipay = require("../models/alipay");
const Order = require("../models/order");
const jsonwebtoken = require("jsonwebtoken");
const { secret } = require("../config");
const alipayf2f = require("alipay-ftof");
const { sendMail } = require("../utils/emailUtil");

class AlipayCtl {
  async updateAlipay(ctx) {
    ctx.verifyParams({
      paymentName: { type: "string", required: true },
      appId: { type: "string", required: true },
      publicKey: { type: "string", required: true },
      secretKey: { type: "string", required: true },
      notifyUrl: { type: "string", required: true }
    });
    const alipay = await Alipay.findByIdAndUpdate(ctx.params.id, {
      paymentName: ctx.request.body.paymentName.trim(),
      appId: ctx.request.body.appId.trim(),
      publicKey: ctx.request.body.publicKey.trim(),
      secretKey: ctx.request.body.secretKey.trim(),
      notifyUrl: ctx.request.body.notifyUrl.trim()
    });
    ctx.body = alipay;
  }

  async fetchAlipay(ctx) {
    ctx.body = await Alipay.findOne();
  }

  async fetchAlipayQrcode(ctx) {
    // console.log("fetchAlipayQrcode");
    const alipay = await Alipay.findOne();
    const alipayConfig = {
      /* 以下信息可以在https://openhome.alipay.com/platform/appManage.htm查到, 不过merchantPrivateKey需要您自己生成 */

      /* 应用AppID */
      appid: alipay.appId,

      /* 通知URL 接受支付宝异步通知需要用到  */
      notifyUrl: alipay.notifyUrl + "/api/alipay/callback",

      /* 公钥 和 私钥 的填写方式 */
      testPrivateKey:
        "-----BEGIN RSA PRIVATE KEY-----\n" +
        "公钥或私钥内容..." +
        "\n-----END RSA PRIVATE KEY-----",

      /* 应用RSA私钥 请勿忘记 -----BEGIN RSA PRIVATE KEY----- 与 -----END RSA PRIVATE KEY-----  */
      merchantPrivateKey:
        "-----BEGIN RSA PRIVATE KEY-----\n" +
        alipay.secretKey +
        "\n-----END RSA PRIVATE KEY-----",
      /* 支付宝公钥 如果为注释掉会使用沙盒公钥 请勿忘记 -----BEGIN PUBLIC KEY----- 与 -----END PUBLIC KEY----- */
      alipayPublicKey:
        "-----BEGIN PUBLIC KEY-----\n" +
        alipay.publicKey +
        "\n-----END PUBLIC KEY-----",

      /* 支付宝支付网关 如果为注释掉会使用沙盒网关 */
      gatewayUrl: "https://openapi.alipay.com/gateway.do"
    };
    var alipay_f2f = new alipayf2f(alipayConfig);
    const result = await alipay_f2f.createQRPay({
      tradeNo: `${ctx.request.body.orderId}`, // 必填 商户订单主键, 就是你要生成的
      subject: `${ctx.request.body.productName}${ctx.request.body.levelName}`, // 必填 商品概要
      totalAmount: ctx.request.body.price, // 必填 多少钱
      body: `购买${ctx.request.body.productName}${ctx.request.body.levelName}共${ctx.request.body.price}元`, // 可选 订单描述, 可以对交易或商品进行一个详细地描述，比如填写"购买商品2件共15.00元"
      timeExpress: 5 // 可选 支付超时, 默认为5分钟
    });
    // console.log("createQRPay");
    // console.log(result);
    if (!result) {
      ctx.throw(401, "获取支付信息失败");
    }
    await Order.updateOne(
      { orderId: ctx.request.body.orderId },
      {
        noInvoice: result.out_trade_no
      }
    );
    const order = await Order.findOne({
      orderId: ctx.request.body.orderId
    });
    // console.log(order.email, "order.email");
    let mail = order.email;
    // console.log(order.code, "code");
    const { code, email, productName, levelName, price, orderId, date } = order;
    sendMail(code, email, productName, levelName, price, orderId, date);
    ctx.body = result.qr_code; // 支付宝返回的结果
  }
  async handleAlipayCallback(ctx) {
    const alipay = await Alipay.findOne();
    const alipayConfig = {
      /* 以下信息可以在https://openhome.alipay.com/platform/appManage.htm查到, 不过merchantPrivateKey需要您自己生成 */

      /* 应用AppID */
      appid: alipay.appId,

      /* 通知URL 接受支付宝异步通知需要用到  */
      notifyUrl: alipay.notifyUrl + "/api/alipay/callback",

      /* 公钥 和 私钥 的填写方式 */
      testPrivateKey:
        "-----BEGIN RSA PRIVATE KEY-----\n" +
        "公钥或私钥内容..." +
        "\n-----END RSA PRIVATE KEY-----",

      /* 应用RSA私钥 请勿忘记 -----BEGIN RSA PRIVATE KEY----- 与 -----END RSA PRIVATE KEY-----  */
      merchantPrivateKey:
        "-----BEGIN RSA PRIVATE KEY-----\n" +
        alipay.secretKey +
        "\n-----END RSA PRIVATE KEY-----",
      /* 支付宝公钥 如果为注释掉会使用沙盒公钥 请勿忘记 -----BEGIN PUBLIC KEY----- 与 -----END PUBLIC KEY----- */
      alipayPublicKey:
        "-----BEGIN PUBLIC KEY-----\n" +
        alipay.publicKey +
        "\n-----END PUBLIC KEY-----",

      /* 支付宝支付网关 如果为注释掉会使用沙盒网关 */
      gatewayUrl: "https://openapi.alipay.com/gateway.do"
    };
    var alipay_f2f = new alipayf2f(alipayConfig);

    var signStatus = alipay_f2f.verifyCallback(ctx.request.body);
    if (signStatus === false) {
      return ctx.throw("回调签名验证未通过");
    }

    /* 商户订单号 */
    var noInvoice = ctx.request.body.out_trade_no;
    /* 订单状态 */
    // console.log(ctx.request.body.trade_status);
    var invoiceStatus = ctx.request.body.trade_status;
    await Order.updateOne(
      { noInvoice: ctx.request.body.out_trade_no },
      { paymentStatus: "已支付" }
    );
    // 支付宝回调通知有多种状态您可以点击已下链接查看支付宝全部通知状态
    // https://doc.open.alipay.com/docs/doc.htm?spm=a219a.7386797.0.0.aZMdK2&treeId=193&articleId=103296&docType=1#s1
    if (invoiceStatus !== "TRADE_SUCCESS") {
      return ctx.body("success");
    }
    /* 一切都验证好后就能更新数据库里数据说用户已经付钱啦 */
  }
}
module.exports = new AlipayCtl();
