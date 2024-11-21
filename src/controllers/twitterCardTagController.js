
import TwitterCardTag from '../models/twitterCardTag.js';
import formatResponse from '../utils/responseFormatter.js';

const getTwitterCardTagByScanAndLink = async (req, res, next) => {
    const { scanId, linkId } = req.params;

    try {
        const data = await TwitterCardTag.findOne({ scanId, linkId });

        if (!data) {
            return res.status(404).json(
                formatResponse({
                    status: 'error',
                    message: 'Twitter Card etiketleri bulunamadı.'
                })
            );
        }

        res.json(
            formatResponse({
                data: data
            })
        );
    } catch (error) {
        console.error('getTwitterCardTagByScanAndLink fonksiyonunda hata:', error);
        next(error);
    }
};

export default {
    getTwitterCardTagByScanAndLink,
};
