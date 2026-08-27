# Godly Women Platform

A modern full-stack web application for a Christian women's community platform.

## Tech Stack

### Frontend
- Next.js 15.5.12
- React 19.1.0
- TypeScript 5.9.3
- Tailwind CSS 3.4.3
- Firebase (Authentication, Firestore, Cloud Storage)
- Zustand (state management)
- Axios (HTTP client)

### Backend
- Node.js
- Express 4.18.2
- TypeScript 5.2.2
- Firebase Admin SDK (Firestore, Authentication)
- Firebase Cloud Functions (optional)

### Database & Services
- **Firebase Cloud Firestore** - NoSQL database
- **Firebase Authentication** - User auth & management
- **Firebase Cloud Storage** - Image & file storage

## Project Structure

```
godlywomenn/
├── frontend/           # Next.js frontend application
│   ├── src/
│   │   ├── app/       # Next.js app directory
│   │   ├── components/
│   │   ├── lib/       # Utilities and API functions
│   │   └── store/     # Zustand stores
│   └── package.json
├── backend/           # Express.js backend API
│   ├── src/
│   │   ├── config/    # Database and auth config
│   │   ├── routes/    # API routes
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── server.ts  # Main server file
│   └── package.json
└── package.json       # Root package.json
```

## Features

- **User Authentication**: JWT-based authentication with email and password
- **Articles**: Community members can write and share articles
- **Prayers**: Share prayer requests and prayer support
- **Marketplace**: Sell and buy resources
- **Messaging**: Direct messaging between community members
- **User Profiles**: User management and profiles

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project (free tier available at https://firebase.google.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd godlywomenn
   ```

2. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project
   - See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed instructions

3. **Install dependencies**
   ```bash
   npm install
   npm run dev:frontend    # Frontend only
   npm run dev:backend     # Backend only
   npm run dev             # Both (with concurrently)
   ```

4. **Setup Environment Variables**

   **Backend** - Create `backend/.env` from `backend/.env.example`:
   ```env
   NODE_ENV=development
   PORT=8000
   JWT_SECRET=your-secret-key-change-in-production
   JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production
   FRONTEND_URL=http://localhost:3000
   FIREBASE_SERVICE_ACCOUNT_KEY={your-firebase-service-account-json}
   ```

   **Frontend** - Create `frontend/.env.local` from `frontend/.env.local.example`:
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_BACKEND_API=http://localhost:8000
   ```

5. **Start Development Servers**
   ```bash
   npm run dev
   ```

This starts both frontend (http://localhost:3000) and backend (http://localhost:8000).

### Firebase Setup

For detailed Firebase setup instructions (project creation, configuration, security rules):
📖 See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

## Running the Application

**Development mode** (from project root):
```bash
npm run dev
```

**Production build**:
```bash
npm run build
npm run start:backend
npm run start:frontend
```

## Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start frontend only
- `npm run dev:backend` - Start backend only
- `npm run build` - Build both frontend and backend
- `npm run build:frontend` - Build frontend only
- `npm run build:backend` - Build backend only
- `npm run start` - Start backend (production)
- `npm run start:frontend` - Start frontend (production)
- `npm run start:backend` - Start backend (production)

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user  
- `GET /api/auth/me` - Get current user profile

### Articles Endpoints
- `GET /api/articles` - Get all articles
- `GET /api/articles/:slug` - Get article by slug
- `POST /api/articles` - Create article (authenticated)
- `PUT /api/articles/:id` - Update article (authenticated)
- `DELETE /api/articles/:id` - Delete article (authenticated)

### Prayers Endpoints
- `GET /api/prayers` - Get all prayers
- `POST /api/prayers` - Create prayer (authenticated)

### Marketplace Endpoints
- `GET /api/marketplace` - Get all items
- `POST /api/marketplace` - Create item (authenticated)

### Messages Endpoints
- `GET /api/messages` - Get user messages (authenticated)
- `POST /api/messages` - Send message (authenticated)

## Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variable: `NEXT_PUBLIC_BACKEND_API`
4. Deploy

### Backend (Render)
1. Push to GitHub
2. Create new Web Service on Render
3. Configure environment variables
4. Deploy

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push to origin
5. Create a Pull Request

## License

© 2026 Godly Women. All rights reserved.
