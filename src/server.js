import app from './app.js';
import config from './config/index.js';
import connectDB from './config/database.js';

const { serverPort, serverUrl } = config;

// Veritabanına bağlan
connectDB();

app.listen(serverPort, serverUrl, () => {
  console.log(`Sunucu ${config.serverPort} üzerinde çalışıyor.`);
  console.log(`Sunucu URL'si: ${config.serverUrl}`);
});
