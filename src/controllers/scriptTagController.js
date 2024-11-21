import ScriptTag from '../models/scriptTag.js';
import formatResponse from '../utils/responseFormatter.js';

const getScriptTagByScanAndLink = async (req, res, next) => {
    const { scanId, linkId } = req.params;

    try {
        const data = await ScriptTag.findOne({ scanId, linkId });

        if (!data) {
            return res.status(404).json(
                formatResponse({
                    status: 'error',
                    message: 'Script etiketleri bulunamadı.'
                })
            );
        }

        res.json(
            formatResponse({
                data: data
            })
        );
    } catch (error) {
        console.error('getScriptTagByScanAndLink fonksiyonunda hata:', error);
        next(error);
    }
};

export default {
    getScriptTagByScanAndLink,
};
