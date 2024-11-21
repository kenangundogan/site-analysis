import mongoose from 'mongoose';

const ScanSchema = new mongoose.Schema({
    url: { type: String, required: true },
    baseUrl: { type: String, required: true },
    options: { type: Object, default: {} },
    status: { type: String, default: 'pending' },
    date: { type: Object },
    report: { type: Object },
});

export default mongoose.model('Scan', ScanSchema);
