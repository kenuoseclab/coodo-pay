// const Koa = require("koa");
const Router = require("koa-router");
const jwt = require("koa-jwt");

const router = new Router({ prefix: "/api/product" });
const {
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchAllProduct
} = require("../controllers/product");
const { addVisits } = require("../controllers/home");
const { secret } = require("../config");
const auth = jwt({ secret });

router.get("/", auth, fetchAllProduct);
router.get("/:id", addVisits, fetchProduct);
router.post("/", auth, createProduct);
router.post("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;
