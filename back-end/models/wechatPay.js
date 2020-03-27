const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const wechatPaySchema = new Schema({
  __v: { type: "number", select: false },
  paymentName: { type: "string", required: true },
  accountID: { type: "string", required: true },
  bussinessId: { type: "string", required: true },
  signMethod: { type: "string", enum: ["MD5", "SHA256"], required: true },
  secretKey: { type: "string", required: true }
});

module.exports = model("WechatPay", wechatPaySchema);
