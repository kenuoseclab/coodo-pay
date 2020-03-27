const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productSchema = new Schema({
  __v: { type: "number", select: false },
  productName: { type: "string", required: true },
  productInfo: { type: "string", required: true },
  memberLevel: { type: "number", enum: [1, 2, 3, 4], required: true },
  sendMail: { type: "string", enum: ["yes", "no"], required: true },
  shippingMethod: { type: "string", enum: ["auto", "manual"], required: true },
  onSale: { type: "string", enum: ["yes", "no"], required: true },
  levelName: { type: "array", required: true },
  levelPrice: { type: "array", required: true },
  levelDesc: { type: "array", required: true },
  levelLimit: { type: "array", required: false },
  levelNote: { type: "array", required: false },
  productId: { type: "number", required: true },
  contact: { type: "array", required: true }
});

module.exports = model("Product", productSchema);
