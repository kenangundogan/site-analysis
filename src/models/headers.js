import mongoose from 'mongoose';

const HeadersSchema = new mongoose.Schema({
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
    headers: {
        type: Object,
        required: true,
    },
});

export default mongoose.model('Headers', HeadersSchema);
