# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### 1. Create a Firebase Project (2 min)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"** → name it `godlywomenn`
3. Wait for creation to complete

### 2. Get Firebase Config (1 min)

**For Frontend:**
1. In Firebase Console, click your project
2. Click **"+ Add app"** → **"Web"**
3. Copy the config object and add to `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_value
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_value
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_value
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_value
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_value
   NEXT_PUBLIC_FIREBASE_APP_ID=your_value
   NEXT_PUBLIC_BACKEND_API=http://localhost:8000
   ```

**For Backend:**
1. In Firebase Console, go to **Project Settings** → **Service Accounts**
2. Click **"Generate New Private Key"**
3. Copy the JSON and add to `backend/.env`:
   ```env
   FIREBASE_SERVICE_ACCOUNT_KEY={paste-json-here}
   ```

### 3. Enable Services (1 min)

In Firebase Console:
1. Go to **Build** → **Authentication** → Enable **Email/Password**
2. Go to **Build** → **Firestore Database** → Create database in **test mode**
3. Go to **Build** → **Storage** → Create bucket in **test mode**

### 4. Start Development (1 min)

```bash
npm install
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## 📚 Full Setup

For complete setup with security rules and best practices:
👉 See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

## 🔧 Troubleshooting

**Q: Firebase config variables missing?**
- Create the `.env.local` files from examples and fill in your Firebase values

**Q: Backend won't start?**
- Ensure `FIREBASE_SERVICE_ACCOUNT_KEY` is valid JSON in `backend/.env`
- Remove any line breaks from the JSON value

**Q: Can't register users?**
- Check that Email/Password auth is enabled in Firebase Console
- Verify Firestore database is created and in test mode

**Q: Can't upload images?**
- Enable Cloud Storage in Firebase Console
- Check storage security rules allow authenticated uploads

## 📖 Documentation

- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Detailed Firebase setup guide
- [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md) - What changed from Supabase
- [README.md](./README.md) - Project overview

## 🎯 Common Tasks

**View Firestore data:**
Firebase Console → Firestore Database → Collections tab

**Monitor authentication:**
Firebase Console → Authentication → Users tab

**Check uploaded files:**
Firebase Console → Storage → Files tab

**View API requests:**
Backend console output when running `npm run dev:backend`

## 🚢 Production Deployment

Before deploying to production:
1. ✅ Update Firestore security rules (remove test mode)
2. ✅ Update Cloud Storage rules
3. ✅ Set up custom domain (Firebase Hosting)
4. ✅ Configure production Firebase project
5. ✅ Review and update `.env` variables

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) → Production Checklist
