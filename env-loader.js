// Simple environment variable loader for client-side applications
class EnvLoader {
    constructor() {
        this.env = {};
        this.loaded = false;
    }

    async loadEnv() {
        try {
            // Check if we're on Vercel
            const isVercel = window.location.hostname.includes('.vercel.app') || 
                           window.location.hostname.includes('vercel.app');
            
            if (isVercel) {
                // For Vercel, show a helpful message about configuration
                throw new Error('Please configure GOOGLE_API_KEY environment variable in your Vercel project settings');
            }

            // Try to load from .env file (for local development)
            const response = await fetch('.env');
            if (!response.ok) {
                throw new Error('Could not fetch .env file');
            }
            
            const envContent = await response.text();
            
            envContent.split('\n').forEach(line => {
                line = line.trim();
                if (line && !line.startsWith('#')) {
                    const [key, ...valueParts] = line.split('=');
                    const value = valueParts.join('=');
                    this.env[key] = value;
                }
            });
            
            this.loaded = true;
            return this.env;
        } catch (error) {
            console.error('Failed to load environment variables:', error);
            
            // Final fallback: check if there are any global injected environment variables
            if (typeof GOOGLE_API_KEY !== 'undefined') {
                this.env.GOOGLE_API_KEY = GOOGLE_API_KEY;
                this.loaded = true;
                return this.env;
            }
            
            throw new Error('Environment variables could not be loaded. Please ensure GOOGLE_API_KEY is configured.');
        }
    }

    get(key) {
        if (!this.loaded) {
            throw new Error('Environment not loaded. Call loadEnv() first.');
        }
        return this.env[key];
    }
}

// Create global instance
window.envLoader = new EnvLoader();
