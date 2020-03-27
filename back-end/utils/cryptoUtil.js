const utils = require("utility");
const { secret } = require("../config");
class cryptoUtil {
  md5Pwd(pwd) {
    const salt = secret;
    return utils.md5(utils.md5(pwd + salt));
  }
}
module.exports = new cryptoUtil();
