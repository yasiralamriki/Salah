const fs = require('fs');
const path = require('path');

// Create dist directory
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

// Read environment variables
const googleApiKey = process.env.GOOGLE_API_KEY;

if (!googleApiKey) {
    console.error('GOOGLE_API_KEY environment variable is required');
    process.exit(1);
}

// Copy static files
const filesToCopy = ['resources'];

filesToCopy.forEach(file => {
    const srcPath = path.join('.', file);
    const destPath = path.join('dist', file);
    
    if (fs.statSync(srcPath).isDirectory()) {
        // Copy directory recursively
        fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
        // Copy file
        fs.copyFileSync(srcPath, destPath);
    }
});

// Copy and modify index.html to inject environment variables
let indexHtml = fs.readFileSync('index.html', 'utf8');

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
fs.copyFileSync('env-loader.js', path.join('dist', 'env-loader.js'));
fs.copyFileSync('index.js', path.join('dist', 'index.js'));

console.log('✅ Build completed successfully for Vercel deployment');
