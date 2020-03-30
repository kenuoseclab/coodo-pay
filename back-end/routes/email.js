const Router = require("koa-router");
const jwt = require("koa-jwt");
const { secret } = require("../config");
const auth = jwt({ secret });
const router = new Router({ prefix: "/api/email" });
const { verifyAnswer } = require("../middlewares/verifyAnswer");
const {
  // index,
  // upload,
  updateEmail,
  fetchEmail
} = require("../controllers/email");

router.post("/:id", auth, verifyAnswer, updateEmail);
router.get("/", auth, fetchEmail);

// router.post("/upload", auth, upload);

module.exports = router;
