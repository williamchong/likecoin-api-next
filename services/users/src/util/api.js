/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { OAUTH_API_HOST } from '../config/config'; // eslint-disable-line import/no-unresolved
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
