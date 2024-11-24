import TrackingCode from '../models/trackingCode.js';
import formatResponse from '../utils/responseFormatter.js';

const getTrackingCodeByScanAndLink = async (req, res, next) => {
    const { scanId, linkId } = req.params;

    try {
        const data = await TrackingCode.findOne({ scanId, linkId });

        if (!data) {
            return res.status(404).json(
                formatResponse({
                    status: 'error',
                    message: 'Tracking kodları bulunamadı.'
                })
            );
        }

        res.json(
            formatResponse({
                data: data
            })
        );
    } catch (error) {
        console.error('getTrackingCodeByScanAndLink fonksiyonunda hata:', error);
        next(error);
    }
};

export default {
    getTrackingCodeByScanAndLink,
};
