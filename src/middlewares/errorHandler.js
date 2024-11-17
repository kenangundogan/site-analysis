const errorHandler = (err, req, res, next) => {
  console.error('Hata Orta Katmanı:', err.stack);
  res.status(500).json({ error: err.message || 'İç sunucu hatası.' });
};

export default errorHandler;
