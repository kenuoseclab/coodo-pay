const verifyAnswer = async (ctx, next) => {
  ctx.verifyParams({
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
  await next();
};
module.exports = {
  verifyAnswer
};
