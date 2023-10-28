import crypto from "crypto";
import { jwtDecode } from "jwt-decode";

export const loadRoutes = (routes, callBack) => {
  try {
    routes?.map((item, index) => {
      return callBack(item?.path, item?.file);
    });
  } catch (e) {
    console.log(e.message);
  }
};

export const _tokenDetails = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (e) {
    console.log(e.message);
  }
};

export const SortTableData = (data) => {
  try {
    let _tempArr = [];
    data.forEach((doc) => {
      let item = doc?.data();
      item["id"] = doc?.id;
      _tempArr?.push(item);
    });
    return _tempArr;
  } catch (e) {
    console.log(e?.message);
  }
};

export const PrivateKey = (data) => {
  // 1. crypto: Generate keypair, PKCS#1 format, PEM encoding
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "pkcs1", format: "pem" },
    privateKeyEncoding: { type: "pkcs1", format: "pem" },
  });

  return privateKey;
};

// declare all characters
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateRandomString = (length) => {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
