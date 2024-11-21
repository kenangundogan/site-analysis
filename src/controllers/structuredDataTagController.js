import StructuredDataTag from '../models/structuredDataTag.js';
import formatResponse from '../utils/responseFormatter.js';

const getStructuredDataTagByScanAndLink = async (req, res, next) => {
    const { scanId, linkId } = req.params;

    try {
        const data = await StructuredDataTag.findOne({ scanId, linkId });

        if (!data) {
            return res.status(404).json(
                formatResponse({
                    status: 'error',
                    message: 'StructuredData etiketleri bulunamadı.'
                })
            );
        }

        res.json(
            formatResponse({
                data: data
            })
        );
    } catch (error) {
        console.error('getStructuredDataTagByScanAndLink fonksiyonunda hata:', error);
        next(error);
    }
};

export default {
    getStructuredDataTagByScanAndLink,
};
