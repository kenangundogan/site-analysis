import ATag from '../models/aTag.js';
import formatResponse from '../utils/responseFormatter.js';

const getATagByScanAndLink = async (req, res, next) => {
    const { scanId, aId } = req.params;

    try {
        const data = await ATag.findOne({ scanId, aId });

        if (!data) {
            return res.status(404).json(
                formatResponse({
                    status: 'error',
                    message: 'A etiketleri bulunamadı.'
                })
            );
        }

        res.json(
            formatResponse({
                data: data
            })
        );
    } catch (error) {
        console.error('getATagByScanAndLink fonksiyonunda hata:', error);
        next(error);
    }
};

export default {
    getATagByScanAndLink,
};
