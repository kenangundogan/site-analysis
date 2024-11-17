import app from './app.js';
import config from './config/index.js';
import connectDB from './config/database.js';

const { port } = config;

// Veritabanına bağlan
connectDB();

app.listen(port, () => {
  console.log(`Sunucu ${port} üzerinde çalışıyor.`);
});
