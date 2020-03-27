const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const emailSchema = new Schema({
  __v: { type: "number", select: false },
  mailAddress: { type: "string", required: true },
  mailPassword: { type: "string", required: true },
  sendName: { type: "string", required: true }
});

module.exports = model("Email", emailSchema);
