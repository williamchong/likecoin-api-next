/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { ISTIO_TRACING_HEADERS } from '../../shared/constant';
import { OAUTH_API_HOST } from '../config/config'; // eslint-disable-line import/no-unresolved

function getIstioHeaders(req) {
  const headers = {};
  if (!req || !ISTIO_TRACING_HEADERS) return headers;
  ISTIO_TRACING_HEADERS.forEach((header) => {
    if (req.headers[header]) headers[header] = req.headers[header];
  });
  return headers;
}

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
