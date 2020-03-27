// const Koa = require("koa");
const Router = require("koa-router");
const jwt = require("koa-jwt");

const router = new Router({ prefix: "/api" });
const {
  fetchAlipay,
  updateAlipay,
  fetchAlipayQrcode,
  handleAlipayCallback
} = require("../controllers/alipay");
const {
  updateWechat,
  updatePaypal,

  fetchWechatPay,
  fetchPaypal
  // handleAlipayCallback
} = require("../controllers/payment");
const { secret } = require("../config");
const auth = jwt({ secret });

// router.post("/alipay/qrcode", fetchAlipayQrcode);
router.post("/alipay/callback", handleAlipayCallback);
router.post("/alipay/:id", auth, updateAlipay);
router.post("/wechatPay/:id", auth, updateWechat);
router.post("/paypal/:id", auth, updatePaypal);
router.get("/alipay", auth, fetchAlipay);
router.get("/wechatPay", auth, fetchWechatPay);
router.get("/paypal", auth, fetchPaypal);

module.exports = router;
