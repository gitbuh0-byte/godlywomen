import { db } from '@/config/firebase';

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

export { db };
export default db;
