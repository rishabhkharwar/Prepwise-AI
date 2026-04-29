# Interview AI - MERN Stack Deployment Guide for Render

## Project Structure
```
Backend/          -> Node.js + Express + MongoDB
Frontend/         -> React + Vite
```

## Deployment Architecture
- **Single Render Service** (Combined Backend + Frontend)
- Backend serves the built React frontend
- All requests routed through the same domain

---

## Step 1: Prepare MongoDB Atlas (Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and new project
3. Create a **Shared Cluster** (free tier)
4. Create Database User (username & password)
5. Add your IP to Network Access (or 0.0.0.0/0 for testing)
6. Get your connection string:
   ```
   mongodb+srv://username:password@cluster-name.mongodb.net/interview-ai?retryWrites=true&w=majority
   ```

---

## Step 2: Setup Google Generative AI Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key (free tier available)
3. Save it safely

---

## Step 3: Local Testing Before Deployment

### Backend Setup
```bash
cd Backend

# Install dependencies
npm install

# Create .env file with:
MONGO_URI=your_mongodb_connection_string
PORT=3000
FRONTEND_URL=http://localhost:5173
GOOGLE_API_KEY=your_google_api_key
JWT_SECRET=your_jwt_secret_here

# Run backend
npm run dev
```

### Frontend Setup
```bash
cd Frontend

# Install dependencies
npm install

# Create .env.local file with:
VITE_API_BASE_URL=http://localhost:3000

# Run frontend
npm run dev
```

---

## Step 4: Deploy to Render

### 4.1 Build the Frontend Locally
```bash
cd Frontend
npm run build
```

This creates a `dist` folder with optimized static files.

### 4.2 Push to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 4.3 Connect to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Fill in the form:
   - **Name**: `interview-ai-backend` (or your choice)
   - **Runtime**: `Node`
   - **Build Command**: 
     ```
     cd Backend && npm install
     ```
   - **Start Command**: 
     ```
     cd Backend && npm start
     ```

5. Add **Environment Variables** in Render dashboard:
   - `MONGO_URI`: `your_mongodb_connection_string`
   - `FRONTEND_URL`: `https://your-app-name.onrender.com`
   - `GOOGLE_API_KEY`: `your_google_api_key`
   - `JWT_SECRET`: `generate_a_strong_secret_string`
   - `NODE_ENV`: `production`

6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes)

---

## Step 5: Update Frontend After Backend Deployment

Once your backend is deployed on Render:

1. Note your Render backend URL: `https://your-app-name.onrender.com`
2. Create `.env.production` in Frontend folder:
   ```
   VITE_API_BASE_URL=https://your-app-name.onrender.com
   ```

3. Rebuild frontend:
   ```bash
   cd Frontend
   npm run build
   ```

4. Push to GitHub and Render will auto-deploy

---

## Important: Minimal Changes for You After Deployment

After the backend is deployed on Render, you only need to:

1. **Update Frontend `.env.production`** with your Render backend URL
2. **Rebuild Frontend**: `npm run build`
3. **Push to GitHub**
4. Render will auto-redeploy

That's it! Everything is configured for automatic deployment.

---

## File Changes Made

### Backend
- ✅ `server.js` - Uses dynamic PORT from environment
- ✅ `src/app.js` - Serves frontend static files + dynamic CORS
- ✅ `package.json` - Added build & start scripts
- ✅ `.env.example` - Reference for all required variables

### Frontend
- ✅ `src/features/auth/services/auth.api.js` - Uses environment variable for API URL
- ✅ `src/features/interview/services/interview.api.js` - Uses environment variable for API URL
- ✅ `.env.example` - Reference for frontend variables

---

## Troubleshooting

### "Cannot GET /" on Render
- Make sure build script ran correctly
- Check logs: `npm run build` must complete without errors

### API requests returning 404
- Verify `FRONTEND_URL` env variable matches your Render URL
- Check CORS settings in `src/app.js`

### MongoDB connection timeout
- Add Render IP to MongoDB Atlas Network Access
- Verify `MONGO_URI` format is correct

### Free Tier Limitations
- Render spins down free services after 15 minutes of inactivity
- First request may take 30 seconds
- Avoid CPU-intensive operations

---

## Next Steps

1. ✅ All code modifications done locally
2. Push to GitHub
3. Deploy backend on Render (follow Step 4.3)
4. Get Render backend URL
5. Update Frontend `.env.production` with backend URL
6. Rebuild and push frontend
7. Done!

