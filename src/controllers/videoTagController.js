import VideoTag from '../models/videoTag.js';
import formatResponse from '../utils/responseFormatter.js';

const getVideoTagByScanAndLink = async (req, res, next) => {
    const { scanId, linkId } = req.params;

    try {
        const data = await VideoTag.findOne({ scanId, linkId });

        if (!data) {
            return res.status(404).json(
                formatResponse({
                    status: 'error',
                    message: 'Video etiketleri bulunamadı.'
                })
            );
        }

        res.json(
            formatResponse({
                data: data
            })
        );
    } catch (error) {
        console.error('getVideoTagByScanAndLink fonksiyonunda hata:', error);
        next(error);
    }
};

export default {
    getVideoTagByScanAndLink,
};
