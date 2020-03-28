const User = require("../models/user");
const jsonwebtoken = require("jsonwebtoken");
const { secret } = require("../config");
const { md5Pwd } = require("../utils/cryptoUtil");
class UserCtl {
  async fetchUser(ctx) {
    ctx.body = await User.findOne();
  }
  async forgetUser(ctx) {
    ctx.verifyParams({
      password: { type: "string", required: true },
      answer1: { type: "string", required: true },
      answer2: { type: "string", required: true }
    });
    const user = await User.findOne({
      answer1: ctx.request.body.answer1,
      answer2: ctx.request.body.answer2
    });
    if (!user) {
      ctx.throw(403, "安全问题验证错误");
    }
    const newUser = await User.findByIdAndUpdate(user._id, {
      password: md5Pwd(ctx.request.body.password)
    });
    ctx.body = newUser;
  }
  async createUser(ctx) {
    // console.log(ctx.request.body);
    ctx.verifyParams({
      email: { type: "string", required: true },
      password: { type: "string", required: true },
      answer1: { type: "string", required: true },
      answer2: { type: "string", required: true }
    });
    // const { name } = ctx.request.body;
    // console.log(ctx.request.body);
    let date = new Date();
    const user = await new User({
      ...ctx.request.body,
      password: md5Pwd(ctx.request.body.password),
      date: date.toLocaleDateString()
    }).save();
    const setting = (ctx.body = user);
  }
  async loginUser(ctx) {
    ctx.verifyParams({
      email: { type: "string", required: true },
      password: { type: "string", required: true }
    });
    const user = await User.findOne({
      email: ctx.request.body.email.trim(),
      password: md5Pwd(ctx.request.body.password.trim())
    });
    // console.log(user);
    if (!user) {
      // console.log("hello");
      ctx.throw(401, "用户名或密码错误");
    }
    const { _id, email } = user;
    const jwt = jsonwebtoken.sign({ _id, email }, secret, {
      expiresIn: "1d"
    });
    ctx.body = jwt;
  }
  async updateUser(ctx) {
    ctx.verifyParams({
      email: { type: "string", required: true },
      password: { type: "string", required: true },
      answer1: { type: "string", required: true },
      answer2: { type: "string", required: true }
    });
    const user = await User.findOne({
      answer1: ctx.request.body.answer1,
      answer2: ctx.request.body.answer2
    });
    if (!user) {
      ctx.throw(403, "安全问题验证错误");
    }
    user = await User.findByIdAndUpdate(ctx.params.id, {
      email: ctx.request.body.email,
      password: md5Pwd(ctx.request.body.password)
    });
    ctx.body = user;
  }
}
module.exports = new UserCtl();
