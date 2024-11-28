import Link from '../models/link.js';
import formatResponse from '../utils/responseFormatter.js';

const getLinksByUrl = async (req, res, next) => {
    try {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json(
                formatResponse({
                    status: 'error',
                    message: 'URL parametresi zorunludur.',
                })
            );
        }

        const links = await Link.find({ url });

        res.json(
            formatResponse({
                status: 'success',
                data: links,
            })
        );
    } catch (error) {
        console.error('getLinksByUrl fonksiyonunda hata:', error);
        next(error);
    }
};

export default {
    getLinksByUrl,
    // Diğer fonksiyonlar...
};