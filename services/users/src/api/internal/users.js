import { Router } from 'express';

import { jwtAuth } from '../../util/jwt';
import {
  checkPlaformPayload,
  tryToLinkOAuthLogin,
  tryToUnlinkOAuthLogin,
} from '../../util/users';

const router = Router();

router.post('/internal/users/oauth/add', jwtAuth('write'), async (req, res, next) => {
  try {
    const { user, platform } = req.body;
    if (req.user.user !== user) {
      res.status(401).send('LOGIN_NEEDED');
      return;
    }
    const { platformUserId } = await checkPlaformPayload(req);
    await tryToLinkOAuthLogin(user, platform, platformUserId);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.post('/internal/users/oauth/remove', jwtAuth('write'), async (req, res, next) => {
  try {
    const { user, platform } = req.body;
    if (req.user.user !== user) {
      res.status(401).send('LOGIN_NEEDED');
      return;
    }
    await tryToUnlinkOAuthLogin(user, platform);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

export default router;
