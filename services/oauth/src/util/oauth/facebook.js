import axios from 'axios';
import { ValidationError } from '../../../shared/ValidationError';

const {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
} = require('../config/config.js'); // eslint-disable-line import/no-unresolved, import/no-extraneous-dependencies

export async function fetchFacebookUser(accessToken) {
  if (!FACEBOOK_APP_ID || !FACEBOOK_APP_SECRET) throw new ValidationError('facebook app not configured');
  let { data } = await axios.get(`https://graph.facebook.com/oauth/access_token?client_id=${FACEBOOK_APP_ID}&client_secret=${FACEBOOK_APP_SECRET}&grant_type=client_credentials`);
  const { access_token: appToken } = data;
  ({ data } = await axios.get(`https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appToken}`));
  if (!data || !data.data || !data.data.is_valid) throw new ValidationError('invalid fb token');
  const { user_id: userId, app_id: appId } = data.data;
  ({ data } = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,link,email`));
  const { name: displayName, link, email } = data;
  ({ data } = await axios.get(`https://graph.facebook.com/me/accounts?access_token=${accessToken}&fields=id,name,link`));
  const pages = data.data;
  return {
    displayName,
    link,
    userId,
    email,
    appId,
    pages,
  };
}

export default fetchFacebookUser;
