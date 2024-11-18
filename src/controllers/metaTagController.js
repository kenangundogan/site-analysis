import MetaTag from '../models/metaTag.js';

const getMetaTagsByLink = async (req, res, next) => {
    try {
        const { scanId, linkId } = req.params;

        // MetaTag belgelerini sorguluyoruz
        const metaTags = await MetaTag.find({ scanUuid: scanId, linkId });

        if (!metaTags.length) {
            return res.status(404).json({ message: 'Meta tag bulunamadı.' });
        }

        res.json(metaTags);
    } catch (error) {
        next(error);
    }
};

export default {
    getMetaTagsByLink,
};
