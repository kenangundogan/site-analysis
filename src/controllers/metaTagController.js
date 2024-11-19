import MetaTag from '../models/metaTag.js';
import formatResponse from '../utils/responseFormatter.js';

const getMetaTagsByScanAndLink = async (req, res, next) => {
    const { scanId, linkId } = req.params;

    try {
        const data = await MetaTag.findOne({ scanId, linkId });

        if (!data) {
            return res.status(404).json(
                formatResponse({
                    status: 'error',
                    message: 'Meta tag bulunamadı.',
                })
            );
        }

        res.json(
            formatResponse({
                data: data
            })
        );
    } catch (error) {
        console.error('getMetaTagsByScanAndLink fonksiyonunda hata:', error);
        next(error);
    }
};

export default {
    getMetaTagsByScanAndLink,
};
