const express = require('express');
const cors = require('cors');
const FastSpeedtest = require('fast-speedtest-api');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

const speedtest = new FastSpeedtest({
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
    verbose: false,
    timeout: 5000,
    https: true,
    urlCount: 5,
    bufferSize: 8,
    unit: FastSpeedtest.UNITS.Mbps,
    proxy: 'http://optional:auth@my-proxy:123'
});

app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/run-speed-test', async (req, res) => {
    try {
        const downloadSpeed = await speedtest.getSpeed();
        const uploadSpeed = await speedtest.getSpeed('upload');
        res.json({ downloadSpeed, uploadSpeed });
    } catch (error) {
        res.status(500).json({ error: `Speed test failed: ${error.message}` });
    }
});

app.get('/test-connection', async (req, res) => {
    try {
        const response = await fetch('https://www.google.com');
        if (response.ok) {
            res.json({ status: 'success', message: 'Internet connection is working.' });
        } else {
            res.json({ status: 'error', message: 'Unable to reach external servers.' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: `Error: ${error.message}` });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});