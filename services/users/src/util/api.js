/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { OAUTH_API_HOST } from '../config/config'; // eslint-disable-line import/no-unresolved

export const fetchFacebookUser = token => axios.get(`${OAUTH_API_HOST}/oauth/facebook/user?token=${token}`);
