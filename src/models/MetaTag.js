import mongoose from 'mongoose';

const MetaTagSchema = new mongoose.Schema({
    scanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scan',
        required: true,
    },
    linkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link',
        required: true,
    },
    attributes: {
        type: Object,
        required: true,
    },
});

export default mongoose.model('MetaTag', MetaTagSchema);
