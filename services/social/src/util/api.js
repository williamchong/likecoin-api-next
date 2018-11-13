/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { USER_API_HOST, OAUTH_API_HOST } from '../config/config'; // eslint-disable-line import/no-unresolved
import { getIstioHeaders } from '../../shared/util/istioHeaders';

export const tryToLinkOAuthLogin = (
  user,
  platform,
  { accessToken, firebaseIdToken, token },
  req,
) => {
  const headers = { ...getIstioHeaders(req), cookies: req.headers.cookies };
  return axios.post(`${USER_API_HOST}/internal/users/oauth/add`, {
    user,
    platform,
    accessToken,
    firebaseIdToken,
    token,
  }, { headers });
};

export const tryToUnlinkOAuthLogin = (user, platform, req) => {
  const headers = { ...getIstioHeaders(req), cookies: req.headers.cookies };
  return axios.post(
    `${USER_API_HOST}/internal/users/oauth/remove`,
    { user, platform },
    { headers },
  );
};

export const fetchFacebookUser = (token, req) => {
  const headers = getIstioHeaders(req);
  return axios.get(`${OAUTH_API_HOST}/internal/oauth/facebook/user?token=${token}`, { headers });
};

export const fetchFlickrOAuthInfo = (user, req) => {
  const headers = getIstioHeaders(req);
  return axios.get(`${OAUTH_API_HOST}/internal/oauth/flickr/info?user=${user}`, { headers });
};

export const fetchFlickrUser = (token, secret, verifier, req) => {
  const headers = getIstioHeaders(req);
  return axios.get(
    `${OAUTH_API_HOST}/internal/oauth/flickr/user?token=${token}&secret=${secret}&verifier=${verifier}`,
    { headers },
  );
};

export const fetchMediumOAuthInfo = (user, req) => {
  const headers = getIstioHeaders(req);
  return axios.get(`${OAUTH_API_HOST}/internal/oauth/medium/info?user=${user}`, { headers });
};

export const fetchMediumUser = (code, req) => {
  const headers = getIstioHeaders(req);
  return axios.get(`${OAUTH_API_HOST}/internal/oauth/medium/user?code=${code}`, { headers });
};

export const fetchTwitterOAuthInfo = (user, req) => {
  const headers = getIstioHeaders(req);
  return axios.get(`${OAUTH_API_HOST}/internal/oauth/twitter/info?user=${user}`, { headers });
};

export const fetchTwitterUser = (token, secret, verifier, req) => {
  const headers = getIstioHeaders(req);
  return axios.get(
    `${OAUTH_API_HOST}/internal/oauth/twitter/user?token=${token}&secret=${secret}&verifier=${verifier}`,
    { headers },
  );
};

export const fetchTwitterUserByAccessToken = (token, secret, req) => {
  const headers = getIstioHeaders(req);
  return axios.get(
    `${OAUTH_API_HOST}/internal/oauth/twitter/user/accesstoken?token=${token}&secret=${secret}`,
    { headers },
  );
};
