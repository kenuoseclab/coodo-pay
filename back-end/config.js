"use strict";
const path = require("path");

module.exports = {
  port: 3001,
  secret: "coodo-pay",
  connection:
    "mongodb+srv://name:password@cluster0-ekmdm.mongodb.net/test?retryWrites=true&w=majority",
  publicDir: path.resolve(__dirname, "./public"),
  logPath: path.resolve(__dirname, "./logs/koa-template.log"),
  mongoDB: {
    database: "mall",
    username: "root",
    password: "root",
    host: "127.0.0.1",
    port: 27017
  }
};
