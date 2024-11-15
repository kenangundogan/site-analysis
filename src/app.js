import express from 'express';
import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

// Rotalar
app.use('/', routes);

// Hata Yönetimi Orta Katmanı
app.use(errorHandler);

export default app;
