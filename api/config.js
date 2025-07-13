module.exports = function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    
    const googleApiKey = process.env.GOOGLE_API_KEY;
    
    if (!googleApiKey) {
        res.status(500).json({ error: 'GOOGLE_API_KEY not configured' });
        return;
    }
    
    res.status(200).json({
        GOOGLE_API_KEY: googleApiKey
    });
};
