import CryptoJS from 'crypto-js';

export const generateKeyPair = (): { publicKey: string; privateKey: string } => {
  const privateKey = CryptoJS.lib.WordArray.random(32).toString();
  const publicKey = CryptoJS.SHA256(privateKey).toString();
  return { publicKey, privateKey };
};

export const encryptMessage = (message: string, publicKey: string): string => {
  return CryptoJS.AES.encrypt(message, publicKey).toString();
};

export const decryptMessage = (encryptedMessage: string, privateKey: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, privateKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Failed to decrypt message');
    return '[Unable to decrypt message]';
  }
};

export const getPrivateKey = (): string | null => {
  return sessionStorage.getItem('privateKey');
};