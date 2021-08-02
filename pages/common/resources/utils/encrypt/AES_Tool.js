// var CryptoJS = require('aes.js');  
var fun_aes = require("./aes.js"); //引用AES源码js


var key = fun_aes.CryptoJS.enc.Utf8.parse("1716bf8fca1f9273"); //十六位十六进制数作为秘钥

var iv = fun_aes.CryptoJS.enc.Utf8.parse('1230001000000000'); //十六位十六进制数作为秘钥偏移量
// AES_CBC 加密

function Encrypt(word) {
  var srcs = fun_aes.CryptoJS.enc.Utf8.parse(word);
  var encrypted = fun_aes.CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: fun_aes.CryptoJS.mode.CBC,
    padding: fun_aes.CryptoJS.pad.Pkcs7
  }); //返回大写十六进制加密结果

  return encrypted.ciphertext.toString().toUpperCase();
} // AES_ECB 加密


function EncryptToECB(word) {
  var srcs = fun_aes.CryptoJS.enc.Utf8.parse(word);
  var encrypted = fun_aes.CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: fun_aes.CryptoJS.mode.CBC,
    padding: fun_aes.CryptoJS.pad.Pkcs7
  }); //返回大写十六进制加密结果

  return encrypted.ciphertext.toString().toUpperCase();
} // AES+Base64_CBC 双重加密


function EncryptBASE64(word) {
  var srcs1 = fun_aes.CryptoJS.enc.Utf8.parse(word);
  var encrypted1 = fun_aes.CryptoJS.AES.encrypt(srcs1, key, {
    iv: iv,
    mode: fun_aes.CryptoJS.mode.CBC,
    padding: fun_aes.CryptoJS.pad.Pkcs7
  }); //返回base64加密结果

  return encrypted1.toString();
} // AES+Base64_ECB 双重加密


function EncryptBASE64ToECB(word) {
  var srcs1 = fun_aes.CryptoJS.enc.Utf8.parse(word);
  var encrypted1 = fun_aes.CryptoJS.AES.encrypt(srcs1, key, {
    iv: iv,
    mode: fun_aes.CryptoJS.mode.ECB,
    padding: fun_aes.CryptoJS.pad.Pkcs7
  }); //返回base64加密结果

  return encrypted1.toString();
} // AES_CBC 解密


function Decrypt(word) {
  var encryptedHexStr = fun_aes.CryptoJS.enc.Hex.parse(word);
  var srcs = fun_aes.CryptoJS.enc.Base64.stringify(encryptedHexStr);
  var decrypt = fun_aes.CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: fun_aes.CryptoJS.mode.CBC,
    padding: fun_aes.CryptoJS.pad.Pkcs7
  });
  var decryptedStr = decrypt.toString(fun_aes.CryptoJS.enc.Utf8);
  return decryptedStr.toString();
} // AES_ECB 解密


function DecryptToECB(word) {
  var encryptedHexStr = fun_aes.CryptoJS.enc.Hex.parse(word);
  var srcs = fun_aes.CryptoJS.enc.Base64.stringify(encryptedHexStr);
  var decrypt = fun_aes.CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: fun_aes.CryptoJS.mode.ECB,
    padding: fun_aes.CryptoJS.pad.Pkcs7
  });
  var decryptedStr = decrypt.toString(fun_aes.CryptoJS.enc.Utf8);
  return decryptedStr.toString();
} // 暴露接口


module.exports.Decrypt = Decrypt;
module.exports.Encrypt = Encrypt;
module.exports.EncryptBASE64 = EncryptBASE64;