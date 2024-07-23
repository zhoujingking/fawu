import AES from 'crypto-js/aes';
import utf8 from 'crypto-js/enc-utf8';
import ECB from 'crypto-js/mode-ecb';
import Pkcs7 from 'crypto-js/pad-pkcs7';

export const AES_SECRET_KEY = 'fawuzhiku&666666';

export const encrypt = (message) => {
  const key = utf8.parse(AES_SECRET_KEY);
  const encryptedBytes = AES.encrypt(message, key, {
    mode: ECB,
    padding: Pkcs7
  });

  return encryptedBytes.toString();
}

export const decrypt = (message) => {
  const key = utf8.parse(AES_SECRET_KEY);
  const decryptBytes = AES.decrypt(message, key, {
    mode: ECB,
    padding: Pkcs7
  });
  return decryptBytes.toString(utf8);
}