// This file provides configuration for Vercel deployment
// For local development, this will be ignored and .env will be used instead
if (typeof window !== 'undefined') {
    // This is a simple way to check if we're on Vercel
    const isVercel = window.location.hostname.includes('.vercel.app') || 
                     window.location.hostname.includes('vercel.app');
    
    if (isVercel) {
        // In production, we'll need to get the API key from a different source
        // Since we can't inject it at build time easily, we'll rely on the env-loader
        // to handle the .env fallback or other methods
        window.VERCEL_CONFIG = {
            // This will be handled by env-loader.js instead
        };
    }
}
