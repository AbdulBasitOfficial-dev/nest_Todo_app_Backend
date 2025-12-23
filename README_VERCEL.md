# Deploying NestJS Backend to Vercel

This guide explains how to deploy your NestJS backend to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. MongoDB Atlas account (or your MongoDB connection string)
3. Vercel CLI installed (optional): `npm i -g vercel`

## Environment Variables

Before deploying, make sure to set these environment variables in Vercel:

1. **MONGODB_URI** (preferred) or **MONGO_URL** - Your MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`

2. **JWT_SECRET** (if used) - Your JWT secret key for authentication

3. **PORT** (optional) - Vercel will set this automatically

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `todo_backend` (if your backend is in a subfolder)
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave empty (not needed for serverless)
   - **Install Command**: `npm install`
5. Add environment variables in the "Environment Variables" section
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Navigate to the backend directory:
   ```bash
   cd todo_backend
   ```

2. Install Vercel CLI (if not installed):
   ```bash
   npm i -g vercel
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy:
   ```bash
   vercel
   ```

5. For production deployment:
   ```bash
   vercel --prod
   ```

## Project Structure

```
todo_backend/
├── api/
│   └── index.ts          # Serverless function entry point
├── src/
│   └── ...               # Your NestJS source code
├── vercel.json           # Vercel configuration
├── package.json
└── tsconfig.json
```

## How It Works

- `vercel.json` configures Vercel to route all requests to the serverless function
- `api/index.ts` creates a NestJS app instance and handles requests
- The app is cached between invocations for better performance
- CORS is enabled to allow requests from your frontend

## Important Notes

1. **MongoDB Connection**: Make sure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) or add Vercel's IP ranges
2. **Cold Starts**: First request may be slower due to serverless cold starts
3. **Environment Variables**: Never commit `.env` files. Use Vercel's environment variables instead
4. **Build**: Vercel will automatically build your TypeScript code during deployment

## Troubleshooting

### Build Errors
- Make sure all dependencies are in `package.json`
- Check that TypeScript compiles successfully: `npm run build`

### Runtime Errors
- Check Vercel function logs in the dashboard
- Verify environment variables are set correctly
- Ensure MongoDB connection string is valid

### CORS Issues
- CORS is enabled in `api/index.ts` with `origin: true`
- If issues persist, update CORS configuration in `api/index.ts`

## Updating Your Frontend

After deployment, update your frontend's API URL:

```env
VITE_API_URL=https://your-project.vercel.app
```

Replace `your-project` with your actual Vercel project name.

