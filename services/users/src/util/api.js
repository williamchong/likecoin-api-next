/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { OAUTH_API_HOST, SOCIAL_API_HOST } from '../config/config'; // eslint-disable-line import/no-unresolved
import { getIstioHeaders } from '../../shared/util/istioHeaders';

export const fetchFacebookUser = (token, req) => {
  const headers = getIstioHeaders(req);
  return axios.get(`${OAUTH_API_HOST}/internal/oauth/facebook/user?token=${token}`, { headers });
};

export const fetchTwitterUser = (token, secret, req) => {
  const headers = getIstioHeaders(req);
  return axios.get(
    `${OAUTH_API_HOST}/internal/oauth/twitter/user/accesstoken?token=${token}&secret=${secret}`,
    { headers },
  );
};

export const tryToLinkSocialPlatform = (user, platform, { accessToken, secret }, req, token) => {
  const headers = { ...getIstioHeaders(req), cookie: `likecoin_auth=${token}` };
  return axios.post(`${SOCIAL_API_HOST}/internal/social/add`, {
    user,
    platform,
    accessToken,
    secret,
  }, { headers });
};
