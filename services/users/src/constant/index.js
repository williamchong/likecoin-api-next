import { IS_TESTNET, TEST_MODE } from '../../shared/constant';

export const AUTH_COOKIE_OPTION = {
  maxAge: 31556926000, // 365d
  domain: TEST_MODE ? undefined : '.like.co',
  secure: !TEST_MODE,
  httpOnly: true,
};

export const EXTRA_EMAIL_BLACLIST = [
  'tutye.com',
];

export const SUPPORTED_AVATER_TYPE = new Set([
  'jpg',
  'png',
  'gif',
  'webp',
  'tif',
  'bmp',
]);

export { IS_TESTNET, TEST_MODE };
