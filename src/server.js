import app from './app.js';
import config from './config/index.js';
import connectDB from './config/database.js';

const { serverPort, serverUrl } = config;

connectDB();

app.listen(serverPort, serverUrl, () => {
  console.log(`Sunucu başarıyla başlatıldı: Express ${serverUrl}:${serverPort}`);
});
