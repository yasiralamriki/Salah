# Vercel Deployment Guide

## For Vercel Deployment

### 1. Environment Variables Setup in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add a new environment variable:
   - Name: `GOOGLE_API_KEY`
   - Value: Your Google Maps API key
   - Environment: Production (and Preview if needed)

### 2. Deploy

Simply push your code to GitHub and connect it to Vercel, or use the Vercel CLI:

```bash
vercel --prod
```

### 3. How it Works

- **Local Development**: Uses `.env` file loaded via fetch
- **Production (Vercel)**: Uses a serverless API function at `/api/config` to securely serve the API key
- The `env-loader.js` automatically detects the environment and uses the appropriate method

### 4. No Build Step Required

This setup works as a static site with serverless functions - no complex build process needed!

### 5. Local Testing

```bash
npm start
```

Then visit `http://localhost:8001`
