
import DomDepth from '../models/domDepth.js';
import formatResponse from '../utils/responseFormatter.js';

const getDomDepthByScanAndLink = async (req, res, next) => {
    const { scanId, linkId } = req.params;

    try {
        const data = await DomDepth.findOne({ scanId, linkId });

        if (!data) {
            return res.status(404).json(
                formatResponse({
                    status: 'error',
                    message: 'Dom derinlikleri bulunamadı.'
                })
            );
        }

        res.json(
            formatResponse({
                data: data
            })
        );
    } catch (error) {
        console.error('getDomDepthByScanAndLink fonksiyonunda hata:', error);
        next(error);
    }
};

export default {
    getDomDepthByScanAndLink,
};
