import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_SECRET_ROLE_KEY;

const encryptRoleId = (roleId) => {
  return CryptoJS.AES.encrypt(roleId.toString(), secretKey).toString();
};

const decryptRoleId = (encryptedRoleId) => {
  const bytes = CryptoJS.AES.decrypt(encryptedRoleId, secretKey);
  return parseInt(bytes.toString(CryptoJS.enc.Utf8), 10);
};

export { encryptRoleId, decryptRoleId };
