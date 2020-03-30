// const Koa = require("koa");
const Router = require("koa-router");
const jwt = require("koa-jwt");
const { secret } = require("../config");
const auth = jwt({ secret });
const router = new Router({ prefix: "/api/user" });
const {
  fetchUser,
  createUser,
  loginUser,
  updateUser,
  forgetUser,
  verifyAnswer
} = require("../controllers/user");
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

router.get("/", auth, fetchUser);
router.post("/verify", auth, verifyAnswer);
router.post("/", createUser);
router.post("/login", ipBasedRatelimit, loginUser);
router.post("/forget", ipBasedRatelimit, forgetUser);
router.post("/:id", auth, updateUser);

module.exports = router;
