// Configuration loader that works with both local and Vercel environments
(function() {
    'use strict';
    
    // Check if we're in a Vercel environment
    const isVercel = typeof window !== 'undefined' && 
                     (window.location.hostname.includes('vercel.app') || 
                      window.location.hostname.includes('.vercel.app'));
    
    // Global configuration object
    window.AppConfig = {
        apiKey: null,
        loaded: false
    };
    
    // Load configuration
    async function loadConfig() {
        try {
            if (isVercel) {
                // In Vercel, try to get from injected script or fallback
                if (window.VERCEL_ENV_GOOGLE_API_KEY) {
                    window.AppConfig.apiKey = window.VERCEL_ENV_GOOGLE_API_KEY;
                    window.AppConfig.loaded = true;
                    return;
                }
                
                // If no injected variable, this should not happen in production
                throw new Error('No API key available in production environment');
            } else {
                // Local development - try to load from .env file
                try {
                    const response = await fetch('.env');
                    if (!response.ok) throw new Error('Could not fetch .env');
                    
                    const envContent = await response.text();
                    const envLines = envContent.split('\n');
                    
                    for (const line of envLines) {
                        const trimmed = line.trim();
                        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('GOOGLE_API_KEY=')) {
                            const apiKey = trimmed.split('GOOGLE_API_KEY=')[1];
                            window.AppConfig.apiKey = apiKey;
                            window.AppConfig.loaded = true;
                            return;
                        }
                    }
                    
                    throw new Error('GOOGLE_API_KEY not found in .env file');
                } catch (fetchError) {
                    // Fallback: check if there's a global variable (for local testing)
                    if (typeof GOOGLE_API_KEY !== 'undefined') {
                        window.AppConfig.apiKey = GOOGLE_API_KEY;
                        window.AppConfig.loaded = true;
                        return;
                    }
                    
                    throw fetchError;
                }
            }
        } catch (error) {
            console.error('Failed to load configuration:', error);
            window.AppConfig.error = error.message;
        }
    }
    
    // Expose load function globally
    window.loadAppConfig = loadConfig;
})();
