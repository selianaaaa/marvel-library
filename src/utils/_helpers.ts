import CryptoJS from 'crypto-js';

/**
 * Encode keys to md5 hash for requests
 *  @param {string} privateKey
 *  @param {string} publicKey
 *  @param {string} timeStamp
 *  @returns {CryptoJS.lib.WordArray} encrypred strings
 */
export const encodeMd5 = ({
  timeStamp,
  privateKey = '',
  publicKey = '',
}: {
  timeStamp: number;
  privateKey?: string;
  publicKey?: string;
}) => {
  const stringToHash = timeStamp + privateKey + publicKey;
  return CryptoJS.MD5(stringToHash);
};
