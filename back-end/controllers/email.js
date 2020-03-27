// const path = require("path");
const Email = require("../models/email");

class EmailCtl {
  async updateEmail(ctx) {
    ctx.verifyParams({
      mailAddress: { type: "string", required: true },
      mailPassword: { type: "string", required: true },
      sendName: { type: "string", required: true }
    });
    const email = await Email.findByIdAndUpdate(ctx.params.id, {
      mailAddress: ctx.request.body.mailAddress.trim(),
      mailPassword: ctx.request.body.mailPassword.trim(),
      sendName: ctx.request.body.sendName.trim()
    });
    ctx.body = email;
  }
  async fetchEmail(ctx) {
    ctx.body = await Email.findOne();
  }
}
module.exports = new EmailCtl();
