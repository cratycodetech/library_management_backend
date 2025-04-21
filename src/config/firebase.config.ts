import * as dotenv from 'dotenv';
dotenv.config();

import * as admin from 'firebase-admin';

const raw = process.env.FIREBASE_SERVICE_ACCOUNT!;
const serviceAccount = JSON.parse(raw);

// Fix: Replace literal \\n with actual newlines in private_key
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export { admin };
