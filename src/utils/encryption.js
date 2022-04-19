import config from "../config";
const CryptoJS = require("crypto-js");

export const encryptData = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    config.crypto.secretKey
  ).toString();
  return ciphertext;
};

export const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, config.crypto.secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
