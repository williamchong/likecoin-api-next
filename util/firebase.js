import * as admin from 'firebase-admin';

import { FIRESTORE_USER_ROOT } from '../config/config';
import serviceAccount from '../config/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

export const userCollection = FIRESTORE_USER_ROOT ? db.collection(FIRESTORE_USER_ROOT) : null;

export default db;
