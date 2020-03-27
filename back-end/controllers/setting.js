const Setting = require("../models/setting");
const jsonwebtoken = require("jsonwebtoken");
const { secret } = require("../config");
class SettingCtl {
  async fetchSetting(ctx) {
    ctx.body = await Setting.findOne();
  }
  async updateSetting(ctx) {
    ctx.verifyParams({
      themeOption: {
        type: "string",
        enum: ["default", "tech"],
        required: false
      },
      isFirst: {
        type: "string",
        enum: ["yes", "no"],
        required: true
      }
    });
    const setting = await Setting.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = setting;
  }
}
module.exports = new SettingCtl();
