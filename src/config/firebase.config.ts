import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';


const serviceAccountPath = path.join(__dirname, '../../message-notification-830cc-firebase-adminsdk-cwytn-b5811c6135.json');

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(`Service account file not found at ${serviceAccountPath}`);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export { admin };
