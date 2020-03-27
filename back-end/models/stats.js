const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const statsSchema = new Schema({
  __v: { type: "number", select: false },
  date: { type: "string", required: true },
  number: { type: "number", required: true },
  year: { type: "number", required: true },
  month: { type: "number", required: true },
  day: { type: "number", required: true },
  week: { type: "number", required: true },
  totalSales: { type: "number", required: true },
  totalVisits: { type: "number", required: true },
  totalOrders: { type: "number", required: true },
  todayVisits: { type: "number", required: true }
});

module.exports = model("Stats", statsSchema);
