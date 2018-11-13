import { Router } from 'express';

import { fetchFacebookUser } from '../../util/oauth/facebook';
import { fetchFlickrOAuthInfo, fetchFlickrUser } from '../../util/oauth/flickr';
import { fetchMediumOAuthInfo, fetchMediumUser } from '../../util/oauth/medium';
import {
  fetchTwitterOAuthInfo,
  fetchTwitterUser,
  fetchTwitterUserByAccessToken,
} from '../../util/oauth/twitter';
import { ValidationError } from '../../../shared/ValidationError';

const router = Router();

router.get('/oauth/facebook/user', async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) throw new ValidationError('missing token');
    const result = await fetchFacebookUser(token);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/oauth/flickr/info', async (req, res, next) => {
  try {
    const { user } = req.query;
    if (!user) throw new ValidationError('missing user');
    const result = await fetchFlickrOAuthInfo(user);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/oauth/flickr/user', async (req, res, next) => {
  try {
    const { token, secret, verifier } = req.query;
    if (!token || !secret || !verifier) throw new ValidationError('missing params');
    const result = await fetchFlickrUser(token, secret, verifier);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/oauth/medium/info', async (req, res, next) => {
  try {
    const { user } = req.query;
    if (!user) throw new ValidationError('missing user');
    const result = await fetchMediumOAuthInfo(user);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/oauth/medium/user', async (req, res, next) => {
  try {
    const { code } = req.query;
    if (!code) throw new ValidationError('missing code');
    const result = await fetchMediumUser(code);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/oauth/twitter/info', async (req, res, next) => {
  try {
    const { user } = req.query;
    if (!user) throw new ValidationError('missing user');
    const result = await fetchTwitterOAuthInfo(user);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/oauth/twitter/user', async (req, res, next) => {
  try {
    const { token, secret, verifier } = req.query;
    if (!token || !secret || !verifier) throw new ValidationError('missing params');
    const result = await fetchTwitterUser(token, secret, verifier);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/oauth/twitter/user/accesstoken', async (req, res, next) => {
  try {
    const { token, secret } = req.query;
    if (!token || !secret) throw new ValidationError('missing params');
    const result = await fetchTwitterUserByAccessToken(token, secret);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
