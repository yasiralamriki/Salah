// Simple environment variable loader for client-side applications
class EnvLoader {
    constructor() {
        this.env = {};
        this.loaded = false;
    }

    async loadEnv() {
        try {
            const response = await fetch('.env');
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
            console.error('Failed to load .env file:', error);
            throw new Error('Environment variables could not be loaded');
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
