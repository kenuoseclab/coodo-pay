// const Koa = require("koa");
const Router = require("koa-router");
const jwt = require("koa-jwt");

const router = new Router({ prefix: "/api/setting" });
const { fetchSetting, updateSetting } = require("../controllers/setting");
const { secret } = require("../config");
const auth = jwt({ secret });

router.get("/", fetchSetting);
router.post("/:id", auth, updateSetting);
module.exports = router;
