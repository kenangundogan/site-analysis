
import HeadingTag from '../models/headingTag.js';
import formatResponse from '../utils/responseFormatter.js';

const getHeadingTagByScanAndLink = async (req, res, next) => {
    const { scanId, linkId } = req.params;

    try {
        const data = await HeadingTag.findOne({ scanId, linkId });

        if (!data) {
            return res.status(404).json(
                formatResponse({
                    status: 'error',
                    message: 'Heading etiketleri bulunamadı.'
                })
            );
        }

        res.json(
            formatResponse({
                data: data
            })
        );
    } catch (error) {
        console.error('getHeadingTagByScanAndLink fonksiyonunda hata:', error);
        next(error);
    }
};

export default {
    getHeadingTagByScanAndLink,
};
