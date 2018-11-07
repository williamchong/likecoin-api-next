import { TEST_MODE, EXTERNAL_HOSTNAME } from '../../shared/constant';

const crypto = require('crypto');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const config = require('../config/config.js'); // eslint-disable-line import/no-unresolved, import/no-extraneous-dependencies

const audience = EXTERNAL_HOSTNAME;
const issuer = EXTERNAL_HOSTNAME;

let algorithm = 'HS256';
let signSecret;
const secretCertPath = config.JWT_PRIVATE_KEY_PATH;
if (secretCertPath) {
  try {
    signSecret = fs.readFileSync(secretCertPath);
    algorithm = 'RS256';
  } catch (err) {
    console.error(err);
    console.log('RSA key not exist for jwt');
  }
}
if (!signSecret) {
  const secret = TEST_MODE ? 'likecoin' : crypto.randomBytes(64).toString('hex').slice(0, 64);
  signSecret = secret;
}

export const jwtSign = (payload) => {
  const opt = { audience, issuer, algorithm };
  if (!payload.exp) opt.expiresIn = '30d';
  const jwtid = uuidv4();
  opt.jwtid = jwtid;
  return { token: jwt.sign(payload, signSecret, opt), jwtid };
};

export { jwtVerify, jwtAuth, jwtOptionalAuth } from '../../shared/util/jwt';
export default jwtSign;
