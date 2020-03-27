const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  __v: { type: "number", select: false },
  password: { type: "string", required: true, select: false },
  email: { type: "string", required: true },
  date: { type: "string", required: true },
  answer1: { type: "string", required: true, select: false },
  answer2: { type: "string", required: true, select: false }
});
module.exports = model("User", userSchema);
