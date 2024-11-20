import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema({
    scanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scan',
        required: true,
    },
    url: { type: String, required: true },
    statusCode: Number,
    statusMessage: String,
    startDate: Date,
    endDate: Date,
    duration: Number,
    responseHeader: Object,
});

export default mongoose.model('Link', LinkSchema);
