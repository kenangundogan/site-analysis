import TrackingCode from '../models/trackingCode.js';
import { trackingCodeGoogleExtractor } from './modules/trackingCodeGoogleExtractor.js';
import { trackingCodeGemiusExtractor } from './modules/trackingCodeGemiusExtractor.js';

const processTrackingCode = async (document, scanId, linkId) => {
    try {
        const googleTrackingCodes = trackingCodeGoogleExtractor(document);
        const gemiusTrackingCodes = trackingCodeGemiusExtractor(document);
        await TrackingCode.findOneAndUpdate(
            { scanId, linkId },
            {
                attributes: {
                    google: googleTrackingCodes,
                    gemius: gemiusTrackingCodes,
                }
            },
            { upsert: true, new: true }
        );
    } catch (error) {
        console.error('Error processing tracking code:', error);
        throw error;
    }
};

export default {
    processTrackingCode,
};
