import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema({
    scanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scan',
        required: true,
    },
    url: { type: String, required: true },
    date: {
        start: Date,
        end: Date,
        duration: Number,
    },
    status: Object,
    responseHeader: Object,
    content: Object
});

export default mongoose.model('Link', LinkSchema);
