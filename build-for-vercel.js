const fs = require('fs');
const path = require('path');

// Helper function to copy directory recursively (compatible with older Node.js)
function copyDirSync(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDirSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Create dist directory
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
}

// Read environment variables
const googleApiKey = process.env.GOOGLE_API_KEY;

if (!googleApiKey) {
    console.error('GOOGLE_API_KEY environment variable is required');
    process.exit(1);
}

// Copy resources directory
const resourcesSrc = path.join('.', 'resources');
const resourcesDest = path.join('dist', 'resources');

if (fs.existsSync(resourcesSrc)) {
    copyDirSync(resourcesSrc, resourcesDest);
} else {
    console.error('Resources directory not found');
    process.exit(1);
}

// Copy and modify index.html to inject environment variables
let indexHtml;
try {
    indexHtml = fs.readFileSync('index.html', 'utf8');
} catch (error) {
    console.error('Could not read index.html:', error.message);
    process.exit(1);
}

// Inject environment variables as a script tag before env-loader
const envScript = `
    <script>
        // Injected environment variables for production
        window.INJECTED_ENV = {
            GOOGLE_API_KEY: "${googleApiKey}"
        };
    </script>`;

indexHtml = indexHtml.replace('<script src="env-loader.js"></script>', envScript + '\n    <script src="env-loader.js"></script>');

fs.writeFileSync(path.join('dist', 'index.html'), indexHtml);

// Copy JavaScript files
try {
    fs.copyFileSync('env-loader.js', path.join('dist', 'env-loader.js'));
    fs.copyFileSync('index.js', path.join('dist', 'index.js'));
} catch (error) {
    console.error('Could not copy JavaScript files:', error.message);
    process.exit(1);
}

console.log('✅ Build completed successfully for Vercel deployment');

console.log('✅ Build completed successfully for Vercel deployment');
