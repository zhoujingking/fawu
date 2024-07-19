import AES from 'crypto-js/aes';
import utf8 from 'crypto-js/enc-utf8';
import ECB from 'crypto-js/mode-ecb';
import Pkcs7 from 'crypto-js/pad-pkcs7';

export const AES_SECRET_KEY = 'fawuzhiku&666666';

export const encrypt = (message) => {
  const encryptedBytes = AES.encrypt(message, AES_SECRET_KEY, {
    mode: ECB,
    padding: Pkcs7
  });

  return encryptedBytes.toString();
}

export const decrypt = (message) => {
  const decryptBytes = AES.decrypt(message, AES_SECRET_KEY, {
    mode: ECB,
    padding: Pkcs7
  });
  return decryptBytes.toString(utf8);
}