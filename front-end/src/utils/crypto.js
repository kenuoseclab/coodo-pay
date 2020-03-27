import CryptoJS from "crypto-js";
/**
 * 加密（需要先加载lib/aes/aes.min.js文件）
 */
export const encrypt = word => {
  var key = CryptoJS.enc.Utf8.parse("46cc793c53dc451b");
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
};
/**
 * 解密
 */
export const decrypt = word => {
  var key = CryptoJS.enc.Utf8.parse("46cc793c53dc451b");
  var decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};
