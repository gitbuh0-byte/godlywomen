import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

function tryParseServiceAccount(raw?: string) {
  if (!raw) return null;

  // If the env looks like a path to a json file, try reading it
  const maybePath = raw.trim();
  try {
    if (maybePath.startsWith('{')) {
      // JSON string
      return JSON.parse(maybePath);
    }

    // Not a JSON string — treat it as a path
    const filePath = path.isAbsolute(maybePath) ? maybePath : path.resolve(process.cwd(), maybePath);
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents);
    }
  } catch (e: any) {
    console.warn('Could not parse FIREBASE_SERVICE_ACCOUNT_KEY from env or file:', e.message || e);
  }

  // Last resort: try JSON.parse anyway (may throw)
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

const rawServiceEnv = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
const serviceAccountKey = tryParseServiceAccount(rawServiceEnv);

if (!serviceAccountKey && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.warn('⚠️  FIREBASE_SERVICE_ACCOUNT_KEY or GOOGLE_APPLICATION_CREDENTIALS not set.');
  console.warn('');
  console.warn('To set up Firebase credentials, choose one:');
  console.warn('  A) Set GOOGLE_APPLICATION_CREDENTIALS to path of serviceAccount.json:');
  console.warn('     $env:GOOGLE_APPLICATION_CREDENTIALS = "C:\\...\\backend\\serviceAccount.json"');
  console.warn('  B) Download serviceAccount.json from Firebase Console → Project Settings → Service Accounts');
  console.warn('     Place it at: backend/serviceAccount.json');
  console.warn('  C) For local development, use Firestore Emulator:');
  console.warn('     npm install -g firebase-tools');
  console.warn('     firebase emulators:start --only firestore');
  console.warn('     Then set: FIRESTORE_EMULATOR_HOST=localhost:8080');
  console.warn('');
  console.warn('Some features will not work without Firebase credentials.');
}

if (serviceAccountKey) {
  // Repair common newline escape issues and double-escaping
  if (typeof serviceAccountKey.private_key === 'string') {
    let pk: string = serviceAccountKey.private_key as string;
    pk = pk.replace(/\\\\n/g, '\n'); // handle double-escaped
    pk = pk.replace(/\\n/g, '\n'); // handle single-escaped
    pk = pk.trim();
    serviceAccountKey.private_key = pk;

    const hasBegin = pk.includes('-----BEGIN PRIVATE KEY-----');
    const hasEnd = pk.includes('-----END PRIVATE KEY-----');
    if (!hasBegin || !hasEnd) {
      console.warn('⚠️  Service account `private_key` looks malformed or missing PEM markers.');
      console.warn('First 64 chars of private_key:', pk.slice(0, 64));
    }
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey),
      projectId: serviceAccountKey.project_id,
    });
    console.log('✅ Firebase Admin initialized from FIREBASE_SERVICE_ACCOUNT_KEY');
  } catch (e: any) {
    console.error('Failed to initialize Firebase Admin with provided service account:', e.message || e);
    console.error('Falling back to GOOGLE_APPLICATION_CREDENTIALS if set.');
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      try {
        admin.initializeApp();
        console.log('✅ Firebase Admin initialized using GOOGLE_APPLICATION_CREDENTIALS');
      } catch (err) {
        console.error('Failed to initialize Firebase Admin via GOOGLE_APPLICATION_CREDENTIALS:', (err as any).message || err);
      }
    }
  }
} else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  try {
    admin.initializeApp();
    console.log('✅ Firebase Admin initialized using GOOGLE_APPLICATION_CREDENTIALS');
  } catch (err) {
    console.error('Failed to initialize Firebase Admin via GOOGLE_APPLICATION_CREDENTIALS:', (err as any).message || err);
  }
}

export const db = admin.firestore();
export const auth = admin.auth();

export async function initializeDatabase() {
  try {
    // Test Firebase connection by querying a collection
    const snapshot = await db.collection('_test').limit(1).get();
    console.log('✅ Firebase Firestore connected successfully');
  } catch (error) {
    console.error('⚠️  Firebase Firestore connection warning:', error);
    console.warn('⚠️  Running in development mode. Some features may not work.');
  }
}

export async function closeDatabase() {
  await db.terminate();
}

export default db;
