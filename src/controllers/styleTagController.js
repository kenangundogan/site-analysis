import StyleTag from '../models/styleTag.js';
import formatResponse from '../utils/responseFormatter.js';

const getStyleTagByScanAndLink = async (req, res, next) => {
    const { scanId, linkId } = req.params;

    try {
        const data = await StyleTag.findOne({ scanId, linkId });

        if (!data) {
            return res.status(404).json(
                formatResponse({
                    status: 'error',
                    message: 'Style etiketleri bulunamadı.'
                })
            );
        }

        res.json(
            formatResponse({
                data: data
            })
        );
    } catch (error) {
        console.error('getStyleTagByScanAndLink fonksiyonunda hata:', error);
        next(error);
    }
};

export default {
    getStyleTagByScanAndLink,
};
