import { TEST_MODE, EXTERNAL_HOSTNAME } from '../constant';

const crypto = require('crypto');
const fs = require('fs');
const jwt = require('jsonwebtoken'); // eslint-disable-line import/no-extraneous-dependencies
const expressjwt = require('express-jwt'); // eslint-disable-line import/no-extraneous-dependencies
const config = require('../config/config.js'); // eslint-disable-line import/no-unresolved

const audience = EXTERNAL_HOSTNAME;
const issuer = EXTERNAL_HOSTNAME;

let verifySecret;
const publicCertPath = config.JWT_PUBLIC_CERT_PATH;
if (publicCertPath) {
  try {
    verifySecret = fs.readFileSync(publicCertPath);
  } catch (err) {
    console.error(err);
    console.log('RSA key not exist for jwt');
  }
}
if (!verifySecret) {
  const secret = TEST_MODE ? 'likecoin' : crypto.randomBytes(64).toString('hex').slice(0, 64);
  verifySecret = secret;
}

export function getToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  if (req.cookies && req.cookies.likecoin_auth) {
    return req.cookies.likecoin_auth;
  }
  return '';
}

function setNoCacheHeader(res) {
  res.setHeader('Surrogate-Control', 'no-store');
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate',
  );
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
}

export const jwtVerify = (
  token,
  { ignoreExpiration } = {},
) => {
  const opt = { audience, issuer };
  return jwt.verify(token, verifySecret, { ...opt, ignoreExpiration });
};

export const jwtAuth = (permission = 'read') => (req, res, next) => {
  setNoCacheHeader(res);
  expressjwt({
    secret: verifySecret,
    getToken,
    audience,
    issuer,
  })(req, res, (e) => {
    if (e && e.name === 'UnauthorizedError') {
      res.status(401).send('LOGIN_NEEDED');
      return;
    }
    if (!req.user
      || !req.user.permissions
      || (permission && !req.user.permissions.includes(permission))) {
      res.status(401).send('MORE_AUTH_NEEDED');
      return;
    }
    next(e);
  });
};

export const jwtOptionalAuth = (permission = 'read') => (req, res, next) => {
  setNoCacheHeader(res);
  expressjwt({
    credentialsRequired: false,
    secret: verifySecret,
    getToken,
    audience,
    issuer,
  })(req, res, (e) => {
    if (req.user
      && req.user.permissions
      && (permission && !req.user.permissions.includes(permission))) {
      req.user = undefined;
    }
    next(e);
  });
};

export default jwtAuth;
