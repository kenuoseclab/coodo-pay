const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const paypalSchema = new Schema({
  __v: { type: "number", select: false },
  paymentName: { type: "string", required: true },
  clientID: { type: "string", required: true },
  exchangeRate: { type: "number", required: true },
  secretKey: { type: "string", required: true },
  mode: { type: "string", enum: ["生产模式", "沙盒模式"], required: true }
});

module.exports = model("Paypal", paypalSchema);
