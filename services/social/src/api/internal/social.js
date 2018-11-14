import { Router } from 'express';

import { jwtAuth } from '../../../shared/util/jwt';
import { tryToLinkSocialPlatform } from '../../util/social';

const router = Router();

router.post('/internal/social/add', jwtAuth('write'), async (req, res, next) => {
  try {
    const {
      user,
      platform,
      accessToken,
      secret,
    } = req.body;
    if (req.user.user !== user) {
      res.status(401).send('LOGIN_NEEDED');
      return;
    }
    await tryToLinkSocialPlatform(user, platform, { accessToken, secret });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

export default router;
