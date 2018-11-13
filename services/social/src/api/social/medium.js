import { Router } from 'express';
import { PUBSUB_TOPIC_MISC } from '../../../shared/constant';
import publisher from '../../../shared/util/gcloudPub';
import { jwtAuth } from '../../../shared/util/jwt';
import { checkPlatformAlreadyLinked } from '../../util/social';
import { fetchMediumOAuthInfo, fetchMediumUser } from '../../util/api';
import { ValidationError } from '../../../shared/ValidationError';

import {
  userCollection as dbRef,
  FieldValue,
} from '../../../shared/util/firebase';

const router = Router();

router.get('/social/link/medium/:user', jwtAuth('read'), async (req, res, next) => {
  try {
    const { user } = req.params;
    if (req.user.user !== user) {
      res.status(401).send('LOGIN_NEEDED');
      return;
    }
    if (await checkPlatformAlreadyLinked(user, 'medium')) {
      throw new ValidationError('already linked');
    }
    const { url, state } = await fetchMediumOAuthInfo(user);
    await dbRef.doc(user).collection('social').doc('medium').set({
      state,
    }, { merge: true });
    res.json({ url });
  } catch (err) {
    next(err);
  }
});

router.post('/social/link/medium', jwtAuth('write'), async (req, res, next) => {
  try {
    const {
      state,
      code,
      user,
    } = req.body;
    if (req.user.user !== user) {
      res.status(401).send('LOGIN_NEEDED');
      return;
    }
    if (!state || !code || !user) {
      throw new ValidationError('invalid payload');
    }
    const doc = await dbRef.doc(user).collection('social').doc('medium').get();
    const {
      state: dbState,
      isLinked,
    } = doc.data();

    if (isLinked) throw new ValidationError('already linked');
    if (state !== dbState) {
      throw new ValidationError('oauth state not match');
    }
    const {
      userId,
      displayName,
      fullName,
      url,
      imageUrl,
    } = await fetchMediumUser(code);
    await dbRef.doc(user).collection('social').doc('medium').set({
      accessToken: FieldValue.delete(),
      refreshToken: FieldValue.delete(),
      userId,
      displayName,
      fullName,
      url,
      imageUrl,
      isLinked: true,
      ts: Date.now(),
    }, { merge: true });
    res.json({
      platform: 'medium',
      displayName,
      url,
    });
    const userDoc = await dbRef.doc(user).get();
    const {
      email,
      displayName: userDisplayName,
      wallet,
      referrer,
      locale,
      timestamp,
    } = userDoc.data();
    publisher.publish(PUBSUB_TOPIC_MISC, req, {
      logType: 'eventSocialLink',
      platform: 'medium',
      user,
      email: email || undefined,
      displayName: userDisplayName,
      wallet,
      referrer: referrer || undefined,
      locale,
      mediumId: userId,
      mediumName: fullName,
      mediumUserName: displayName,
      mediumURL: url,
      registerTime: timestamp,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
