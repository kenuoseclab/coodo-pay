const utils = require("utility");

class cryptoUtil {
  md5Pwd(pwd) {
    const salt = "coodo_pay_3957x8yza6!@#IUHJh~~";
    return utils.md5(utils.md5(pwd + salt));
  }
}
module.exports = new cryptoUtil();
