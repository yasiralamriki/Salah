# Vercel Deployment Guide

## For Vercel Deployment

### 1. Environment Variables Setup in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add a new environment variable:
   - Name: `GOOGLE_API_KEY`
   - Value: Your Google Maps API key
   - Environment: Production (and Preview if needed)

### 2. Build Configuration

The project is configured to build automatically for Vercel using the `vercel.json` configuration.

### 3. Deploy

Push your code to GitHub and connect it to Vercel, or use the Vercel CLI:

```bash
npm run build  # Optional: test build locally
vercel --prod
```

### 4. How it Works

- **Local Development**: Uses `.env` file and loads via fetch
- **Production (Vercel)**: Environment variables are injected at build time into the HTML
- The `env-loader.js` automatically detects which environment it's running in

### 5. Local Testing of Production Build

```bash
npm run build
cd dist
python -m http.server 8002
```

Then visit `http://localhost:8002`
