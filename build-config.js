const fs = require('fs');
const path = require('path');

// Simple .env parser (avoiding dependency on dotenv for this simple case)
function parseEnv(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error('.env file not found. Please create one based on .env.example');
        process.exit(1);
    }
    
    const envContent = fs.readFileSync(filePath, 'utf8');
    const env = {};
    
    envContent.split('\n').forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('#')) {
            const [key, ...valueParts] = line.split('=');
            const value = valueParts.join('=');
            env[key] = value;
        }
    });
    
    return env;
}

// Read .env file
const env = parseEnv('.env');

// Validate required environment variables
if (!env.GOOGLE_API_KEY) {
    console.error('GOOGLE_API_KEY is required in .env file');
    process.exit(1);
}

// Generate config.js content
const configContent = `const googleApiKey = "${env.GOOGLE_API_KEY}";
`;

// Write config.js
const configPath = path.join('resources', 'config.js');
fs.writeFileSync(configPath, configContent, 'utf8');

console.log('✅ config.js generated successfully from .env file');
