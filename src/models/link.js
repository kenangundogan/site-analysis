import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    scanUuid: { type: String, required: true },
    url: { type: String, required: true },
    alt: { type: String },
    statusCode: { type: Number },
    statusMessage: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    duration: { type: Number },
    response: { type: Object },
    headerInfo: { type: Object },
});

export default mongoose.model('Link', linkSchema);