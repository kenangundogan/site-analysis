import ImgTag from '../models/imgTag.js';
import formatResponse from '../utils/responseFormatter.js';

const getImgTagByScanAndLink = async (req, res, next) => {
    const { scanId, linkId } = req.params;

    try {
        const data = await ImgTag.findOne({ scanId, linkId });

        if (!data) {
            return res.status(404).json(
                formatResponse({
                    status: 'error',
                    message: 'Meta etiketleri bulunamadı.'
                })
            );
        }

        res.json(
            formatResponse({
                data: data
            })
        );
    } catch (error) {
        console.error('getImgTagByScanAndLink fonksiyonunda hata:', error);
        next(error);
    }
};

export default {
    getImgTagByScanAndLink,
};
