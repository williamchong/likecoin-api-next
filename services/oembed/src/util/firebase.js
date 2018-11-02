import * as admin from 'firebase-admin';

import { FIRESTORE_USER_ROOT } from '../../config/config';
import serviceAccount from '../../config/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

export const userCollection = db.collection(FIRESTORE_USER_ROOT);

export default db;
