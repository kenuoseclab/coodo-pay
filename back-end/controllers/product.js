const Product = require("../models/product");
const jsonwebtoken = require("jsonwebtoken");
const { secret } = require("../config");
class ProductCtl {
  async fetchAllProduct(ctx) {
    ctx.body = await Product.find();
  }
  async fetchProduct(ctx) {
    // console.log(ctx.params.id);
    const product = await Product.findOne({
      productId: ctx.params.id
    });
    if (!product) {
      ctx.throw(401, "未找到产品信息");
    }
    ctx.body = product;
  }
  async createProduct(ctx) {
    ctx.verifyParams({
      productName: { type: "string", required: true },
      productInfo: { type: "string", required: true },
      memberLevel: { type: "number", enum: [1, 2, 3, 4], required: true },
      sendMail: { type: "string", enum: ["yes", "no"], required: true },
      shippingMethod: {
        type: "string",
        enum: ["auto", "manual"],
        required: true
      },
      onSale: { type: "string", enum: ["yes", "no"], required: true },
      levelName: { type: "array", required: true },
      levelPrice: { type: "array", required: true },
      levelDesc: { type: "array", required: true },
      levelLimit: { type: "array", required: true },
      levelNote: { type: "array", required: true },
      productId: { type: "number", required: true },
      contact: { type: "array", required: true }
    });
    // const { name } = ctx.request.body;
    const product = await new Product({
      productName: ctx.request.body.productName,
      productInfo: ctx.request.body.productInfo,
      memberLevel: ctx.request.body.memberLevel,
      sendMail: ctx.request.body.sendMail,
      shippingMethod: ctx.request.body.shippingMethod,
      onSale: ctx.request.body.onSale,
      levelName: ctx.request.body.levelName,
      levelPrice: ctx.request.body.levelPrice,
      levelDesc: ctx.request.body.levelDesc,
      levelLimit: ctx.request.body.levelLimit,
      levelNote: ctx.request.body.levelNote,
      productId: ctx.request.body.productId,
      contact: ctx.request.body.contact
    }).save();
    ctx.body = product;
  }
  async updateProduct(ctx) {
    // console.log(ctx.request.body);
    ctx.verifyParams({
      productName: { type: "string", required: true },
      productInfo: { type: "string", required: true },
      memberLevel: { type: "number", enum: [1, 2, 3, 4], required: true },
      sendMail: { type: "string", enum: ["yes", "no"], required: true },
      shippingMethod: {
        type: "string",
        enum: ["auto", "manual"],
        required: true
      },
      onSale: { type: "string", enum: ["yes", "no"], required: true },
      levelName: { type: "array", required: true },
      levelPrice: { type: "array", required: true },
      levelDesc: { type: "array", required: true },
      levelLimit: { type: "array", required: false },
      levelNote: { type: "array", required: false },
      productId: { type: "number", required: true },
      contact: { type: "array", required: true }
    });
    const product = await Product.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = product;
  }
  async deleteProduct(ctx) {
    const product = await Product.findByIdAndRemove(ctx.params.id);
    if (!product) {
      ctx.throw(404);
    }
    ctx.status = 204;
  }
}
module.exports = new ProductCtl();
