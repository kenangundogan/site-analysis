import mongoose from 'mongoose';

const ScanSchema = new mongoose.Schema({
    url: { type: String, required: true },
    baseUrl: { type: String, required: true },
    options: { type: Object, default: {} },
    status: { type: String, default: 'pending' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
});

export default mongoose.model('Scan', ScanSchema);
