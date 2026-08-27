# Firebase Integration Guide

This project now uses **Firebase** instead of Supabase for:
- **Authentication** (Firebase Auth)
- **Database** (Cloud Firestore)
- **File Storage** (Firebase Cloud Storage)
- **Adminsdk for backend** (Firebase Admin SDK)

## Setup Steps

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"**
3. Enter your project name: `godlywomenn` (or desired name)
4. Select or create a Google Cloud project
5. Enable Google Analytics (optional)
6. Click **Create project**

### Step 2: Get Firebase Web Configuration (Frontend)

1. In Firebase Console, click your project
2. Click the **"Web"** app option or click **"+ Add app"** → **"Web"**
3. Register the app as `godlywomenn-web`
4. Copy the Firebase config object:
   ```javascript
   {
     apiKey: "AIzaSyX...",
     authDomain: "godlywomenn.firebaseapp.com",
     projectId: "godlywomenn",
     storageBucket: "godlywomenn.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcd..."
   }
   ```
5. Create `frontend/.env.local` and fill in these values:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

### Step 3: Get Firebase Admin SDK Key (Backend)

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Click the **"Service Accounts"** tab
3. Click **"Generate New Private Key"**
4. A JSON file will download — **keep this secure!**
5. Copy the entire JSON content
6. In `backend/.env`:
   ```env
   FIREBASE_SERVICE_ACCOUNT_KEY={paste-entire-json-here}
   ```

### Step 4: Enable Authentication

1. In Firebase Console, go to **Build** → **Authentication**
2. Click **"Get started"**
3. Enable **Email/Password** as a sign-in method
4. Click **"Save"**

### Step 5: Create Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
   - ⚠️ **Important:** In production, set proper security rules
4. Choose your region (e.g., `us-east1`)
5. Click **"Create"**

### Step 6: Set Up Cloud Storage (Optional - for image uploads)

1. In Firebase Console, go to **Build** → **Storage**
2. Click **"Get started"**
3. Choose **"Start in test mode"** for development
4. Choose your region
5. Click **"Done"**

### Step 7: Set Security Rules (Important!)

#### For Firestore (Development Rules):
In Firebase Console → **Firestore Database** → **Rules** tab:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    match /articles/{document=**} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }
    
    match /prayers/{document=**} {
      allow read: if true;
      allow create, write: if request.auth != null;
    }
    
    match /marketplace/{document=**} {
      allow read: if true;
      allow create, write: if request.auth != null;
    }
    
    match /messages/{conversationId}/{document=**} {
      allow read, write: if request.auth.uid in resource.data.participantIds;
    }
  }
}
```

#### For Cloud Storage (Development Rules):
In Firebase Console → **Storage** → **Rules** tab:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Database Structure

### Firestore Collections:

**`users`** - User profiles
```javascript
{
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  displayName: "John Doe",
  photoURL: "",
  bio: "",
  createdAt: "2024-03-03T...",
  updatedAt: "2024-03-03T..."
}
```

**`articles`** - Blog articles
```javascript
{
  title: "Article Title",
  slug: "article-slug",
  excerpt: "Short excerpt",
  content: "Full content",
  featuredImage: "image-url",
  category: "category-name",
  authorId: "user-uid",
  status: "published",
  views: 0,
  createdAt: "2024-03-03T...",
  updatedAt: "2024-03-03T..."
}
```

**`prayers`** - Prayer requests
```javascript
{
  title: "Prayer Title",
  description: "Prayer details",
  userId: "user-uid",
  createdAt: "2024-03-03T...",
  updatedAt: "2024-03-03T..."
}
```

**`marketplace`** - Marketplace items
```javascript
{
  title: "Item Title",
  description: "Item description",
  price: 19.99,
  image: "image-url",
  userId: "user-uid",
  createdAt: "2024-03-03T...",
  updatedAt: "2024-03-03T..."
}
```

**`messages`** - Conversations
```javascript
{
  participantIds: ["user-uid-1", "user-uid-2"],
  senderId: "user-uid-1",
  receiverId: "user-uid-2",
  lastMessage: "Last message text",
  updatedAt: "2024-03-03T..."
}
```

**`messages/{conversationId}/messageList`** - Individual messages
```javascript
{
  senderId: "user-uid",
  receiverId: "user-uid",
  content: "Message content",
  read: false,
  createdAt: "2024-03-03T..."
}
```

## Frontend Usage

### Authentication

```typescript
import { loginWithEmail, registerWithEmail, logout } from '@/lib/auth-service';

// Login
const result = await loginWithEmail(email, password);

// Register
const result = await registerWithEmail(email, password, firstName, lastName);

// Get current user
const { user } = useAuthStore();
```

### Data Operations

```typescript
import { articlesService, prayersService } from '@/lib/supabase-service';

// Get all articles
const { data, count } = await articlesService.getAll(limit, offset);

// Get single article
const { data: article } = await articlesService.getById(id);

// Create article
await articlesService.create({ title, content, ... });

// Update article
await articlesService.update(id, { title, content, ... });

// Delete article
await articlesService.delete(id);
```

### Upload Images

```typescript
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storageRef = ref(storage, `images/${file.name}`);
await uploadBytes(storageRef, file);
const downloadURL = await getDownloadURL(storageRef);
```

## Backend Usage

### Authentication Middleware

All protected routes use Firebase token verification:
```typescript
import { authMiddleware } from '@/config/auth';

router.post('/articles', authMiddleware, async (req, res) => {
  const userId = (req as any).user.uid; // Firebase UID
  // ...
});
```

### Database Operations

```typescript
import { db } from '@/config/database';

// Get all articles
const snapshot = await db.collection('articles')
  .orderBy('createdAt', 'desc')
  .limit(20)
  .get();

// Add document
await db.collection('articles').add({
  title: "...",
  content: "...",
});

// Update document
await db.collection('articles').doc(id).update({
  title: "...",
});

// Delete document
await db.collection('articles').doc(id).delete();
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Missing Firebase config" | Ensure `.env.local` (frontend) has all `NEXT_PUBLIC_FIREBASE_*` variables |
| "Permission denied" | Check Firestore security rules allow your operation |
| "User not found" | User may not exist in Firebase Auth; ensure they registered first |
| Backend connection failed | Ensure `FIREBASE_SERVICE_ACCOUNT_KEY` is valid JSON in `backend/.env` |
| Image upload fails | Check Cloud Storage rules allow unauthenticated reads and authenticated writes |

## Production Checklist

- [ ] Update Firestore security rules (remove test mode)
- [ ] Update Cloud Storage rules for production
- [ ] Enable HTTPS only (Firebase automatically provides this)
- [ ] Set up Firebase Project Blaze plan for production traffic
- [ ] Configure identity providers (Google, GitHub, etc.) as needed
- [ ] Set up email verification for new registrations
- [ ] Configure email templates for password reset
- [ ] Enable 2FA if needed
- [ ] Set up Firebase Hosting for frontend deployment
- [ ] Monitor Firebase usage in Console Dashboard

## Migration from Supabase

If you were previously using Supabase:
1. Export your data from Supabase
2. Use batch operations to import into Firestore
3. Update frontend imports from `supabase-service` to `firebase-service` (already done)
4. Update backend to use Admin SDK (already done)
5. Test all features before deploying to production

## Resources

- [Firebase Console](https://console.firebase.google.com)
- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Cloud Storage Docs](https://firebase.google.com/docs/storage)
