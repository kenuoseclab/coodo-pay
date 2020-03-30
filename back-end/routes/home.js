const Router = require("koa-router");
const jwt = require("koa-jwt");
const { secret } = require("../config");
const auth = jwt({ secret });
const router = new Router({ prefix: "/api" });

const {
  // index,
  // upload,
  getSalesData,
  createSalesData,
  getStats,
  createStats
  // addVisits
} = require("../controllers/home");

router.get("/stats", getStats);
// router.post("/stats", createStats);
router.get("/salesData", getSalesData);
// router.post("/salesData", createSalesData);
// router.get("/addVisits", addVisits);

// router.post("/upload", auth, upload);

module.exports = router;
