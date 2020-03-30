// const Koa = require("koa");
const Router = require("koa-router");
const jwt = require("koa-jwt");
const { verifyAnswer } = require("../middlewares/verifyAnswer");
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
router.post("/alipay/:id", auth, verifyAnswer, updateAlipay);
router.post("/wechatPay/:id", auth, verifyAnswer, updateWechat);
router.post("/paypal/:id", auth, verifyAnswer, updatePaypal);
router.get("/alipay", auth, fetchAlipay);
router.get("/wechatPay", auth, fetchWechatPay);
router.get("/paypal", auth, fetchPaypal);

module.exports = router;
