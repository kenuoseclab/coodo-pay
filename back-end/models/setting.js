const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const settingSchema = new Schema({
  __v: { type: "number", select: false },
  themeOption: {
    type: "string",
    enum: ["default", "tech"],
    required: true
  },
  isFirst: {
    type: "string",
    enum: ["yes", "no"],
    required: true
  },
  version: {
    type: "number",
    required: true
  }
});

module.exports = model("Setting", settingSchema);
