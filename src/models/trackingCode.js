import mongoose from 'mongoose';

const TrackingCodeSchema = new mongoose.Schema({
    scanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scan',
        required: true,
    },
    linkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link',
        required: true,
        unique: true,
    },
    attributes: {
        type: Object,
        required: true,
    },
});

export default mongoose.model('TrackingCode', TrackingCodeSchema);
