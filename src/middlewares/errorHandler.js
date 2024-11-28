import formatResponse from '../utils/responseFormatter.js';

const errorHandler = (err, req, res, next) => {
    console.error('Hata Orta Katmanı:', err);

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json(
        formatResponse({
            status: 'error',
            message: err.message || 'Sunucu hatası',
        })
    );
};

export default errorHandler;
