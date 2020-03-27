// const Koa = require("koa");
const Router = require("koa-router");
const jwt = require("koa-jwt");

const router = new Router({ prefix: "/api/order" });
const {
  fetchOrder,
  createOrder,
  fetchAllOrder,
  queryOrder,
  verifyCode
} = require("../controllers/order");
const { fetchAlipayQrcode } = require("../controllers/alipay");
const { secret } = require("../config");
const auth = jwt({ secret });
const db = new Map();
const ratelimit = require("koa-ratelimit");
const ipBasedRatelimit = ratelimit({
  driver: "memory",
  db: db,
  duration: 60000,
  errorMessage: "请求次数太多，请稍后重试",
  id: ctx => ctx.ip,
  headers: {
    remaining: "Rate-Limit-Remaining",
    reset: "Rate-Limit-Reset",
    total: "Rate-Limit-Total"
  },
  max: 10,
  disableHeader: false
});
router.get("/all", auth, fetchAllOrder);
router.get("/query", ipBasedRatelimit, queryOrder);
router.get("/fetch/:id", fetchOrder);
router.post("/", ipBasedRatelimit, createOrder, fetchAlipayQrcode);
router.post("/verify", ipBasedRatelimit, verifyCode);

module.exports = router;
