import Headers from '../models/headers.js';
import formatResponse from '../utils/responseFormatter.js';

const getHeadersByScanAndLink = async (req, res, next) => {
    const { scanId, linkId } = req.params;

    try {
        const data = await Headers.findOne({ scanId, linkId }).select('headers -_id');
        
        if (!data) {
            return res.status(404).json(
                formatResponse({
                    status: 'error',
                    message: 'Headers not found',
                })
            );
        }

        res.json(
            formatResponse({
                data: data.headers || [],
            })
        );
    } catch (error) {
        console.error('getHeadersByScanAndLink fonksiyonunda hata:', error);
        next(error);
    }
};

export default {
    getHeadersByScanAndLink,
};
