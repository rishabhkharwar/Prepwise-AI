# Quick Reference: Changes Made for Render Deployment

## BACKEND CHANGES

### 1. Backend/server.js
**What Changed**: Made PORT dynamic
**Why**: Render assigns random ports dynamically
```javascript
// BEFORE: app.listen(3000, ...)
// AFTER:  const PORT = process.env.PORT || 3000
```

### 2. Backend/src/app.js
**What Changed**: 
- Made CORS dynamic (reads from FRONTEND_URL env variable)
- Added code to serve React frontend static files
- Added fallback route for React Router

**Why**: 
- CORS needs to accept your Render frontend URL
- Frontend needs to be served from the same domain
- React Router needs fallback to index.html for all routes

### 3. Backend/package.json
**What Changed**: Added npm scripts
```json
{
  "build": "cd ../Frontend && npm run build",
  "start": "node server.js"
}
```

**Why**: Render needs these scripts to:
- Build the React frontend
- Start the server

### 4. Backend/.env.example (NEW FILE)
**Why**: Shows what environment variables are needed

---

## FRONTEND CHANGES

### 1. Frontend/src/features/auth/services/auth.api.js
**What Changed**: Made API base URL dynamic
```javascript
// BEFORE: baseURL: "https://prepwise-ai-74cx.onrender.com"
// AFTER:  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
```

**Why**: API URL changes based on environment:
- Development: http://localhost:3000
- Production: https://your-render-url.onrender.com

### 2. Frontend/src/features/interview/services/interview.api.js
**What Changed**: Same as above - made API base URL dynamic

### 3. Frontend/.env.example (NEW FILE)
**Why**: Shows what environment variables are needed
```
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Frontend/package.json
**What Changed**: Added start script
**Why**: For local preview and Render compatibility

---

## FILES CREATED

1. **Backend/.env.example** - Template for environment variables
2. **Frontend/.env.example** - Template for environment variables
3. **DEPLOYMENT_GUIDE.md** - Complete deployment instructions
4. **.gitignore** - Prevents .env files from being committed

---

## WHAT YOU NEED TO DO AFTER DEPLOYMENT

**Minimal changes needed!**

After deploying backend to Render and getting URL like:
`https://interview-ai-backend.onrender.com`

### Step 1: Update Frontend .env.production
Create file: `Frontend/.env.production`
```
VITE_API_BASE_URL=https://interview-ai-backend.onrender.com
```

### Step 2: Rebuild Frontend
```bash
cd Frontend
npm run build
```

### Step 3: Push to GitHub
```bash
git add .
git commit -m "Update backend URL for production"
git push origin main
```

That's it! Your app will be live on Render!

---

## ENVIRONMENT VARIABLES TO SET ON RENDER

Set these in Render dashboard:

**Backend**:
- `MONGO_URI` - Your MongoDB connection string
- `GOOGLE_API_KEY` - Your Google AI API key
- `JWT_SECRET` - A random secure string
- `FRONTEND_URL` - Will be your Render URL: https://your-app-name.onrender.com
- `NODE_ENV` - Set to "production"

**Frontend** (if using separate service):
- `VITE_API_BASE_URL` - Your backend Render URL

---

## LOCAL DEVELOPMENT

No changes needed! Just use:
- Backend: `npm run dev` (in Backend folder)
- Frontend: `npm run dev` (in Frontend folder)

Both will work with the new configuration.

