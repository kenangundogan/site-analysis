import LinkTag from '../models/linkTag.js';
import formatResponse from '../utils/responseFormatter.js';

const getLinkTagByScanAndLink = async (req, res, next) => {
    const { scanId, linkId } = req.params;

    try {
        const data = await LinkTag.findOne({ scanId, linkId });

        if (!data) {
            return res.status(404).json(
                formatResponse({
                    status: 'error',
                    message: 'Link etiketleri bulunamadı.'
                })
            );
        }

        res.json(
            formatResponse({
                data: data
            })
        );
    } catch (error) {
        console.error('getLinkTagByScanAndLink fonksiyonunda hata:', error);
        next(error);
    }
};

export default {
    getLinkTagByScanAndLink,
};
