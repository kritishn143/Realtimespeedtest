const FastSpeedtest = require("fast-speedtest-api");

// Replace "your-app-token" with your actual API token
const speedtest = new FastSpeedtest({
    token: "your_token_here",
    verbose: false,
    timeout: 10000,
    https: true,
    urlCount: 5,
    bufferSize: 8,
    unit: FastSpeedtest.UNITS.Mbps,
    proxy: 'http://optional:auth@my-proxy:123'
});

// Perform download speed test
speedtest.getSpeed().then(downloadSpeed => {
    console.log(`Download Speed: ${downloadSpeed.toFixed(2)} Mbps`);

    // Perform upload speed test
    return speedtest.getSpeed('upload');
}).then(uploadSpeed => {
    console.log(`Upload Speed: ${uploadSpeed.toFixed(2)} Mbps`);
}).catch(error => {
    console.error(`Speed test failed: ${error.message}`);
});
