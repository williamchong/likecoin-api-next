const sigUtil = require('eth-sig-util');
const web3Utils = require('web3-utils');

export function personalEcRecover(data, sig) {
  return sigUtil.recoverPersonalSignature({ data, sig });
}

export function hexToUtf8(hex) {
  return web3Utils.hexToUtf8(hex);
}
