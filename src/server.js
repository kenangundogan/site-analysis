import app from './app.js';
import config from './config/index.js';

const { port, serverUrl } = config;

app.listen(port, () => {
    console.log(`Sunucu ${serverUrl}:${port} üzerinde çalışıyor.`);
});
