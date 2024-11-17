import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema({
    uuid: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    baseurl: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    status: { type: String, enum: ['waiting', 'completed', 'error'], default: 'waiting' },
    options: { type: Object },
});

// Koleksiyon adını 'scans' olarak belirtiyoruz
export default mongoose.model('Scan', scanSchema, 'scans');
