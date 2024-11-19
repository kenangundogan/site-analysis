import MetaTag from '../models/metaTag.js';
import formatResponse from '../utils/responseFormatter.js';

const getMetaTagsByScanAndLink = async (req, res, next) => {
    const { scanId, linkId } = req.params;

    try {
        const data = await MetaTag.find({ scanId, linkId }).select('attributes -_id');

        const attributesArray = data.map((metaTag) => metaTag.attributes);

        res.json(
            formatResponse({
                data: attributesArray,
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
