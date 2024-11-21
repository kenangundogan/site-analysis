
import OpenGraphTag from '../models/openGraphTag.js';
import formatResponse from '../utils/responseFormatter.js';

const getOpenGraphTagByScanAndLink = async (req, res, next) => {
    const { scanId, linkId } = req.params;

    try {
        const data = await OpenGraphTag.findOne({ scanId, linkId });

        if (!data) {
            return res.status(404).json(
                formatResponse({
                    status: 'error',
                    message: 'Open Graph etiketleri bulunamadı.'
                })
            );
        }

        res.json(
            formatResponse({
                data: data
            })
        );
    } catch (error) {
        console.error('getOpenGraphTagByScanAndLink fonksiyonunda hata:', error);
        next(error);
    }
};

export default {
    getOpenGraphTagByScanAndLink,
};
