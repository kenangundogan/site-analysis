import mongoose from 'mongoose';

const HeadingTagSchema = new mongoose.Schema({
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
    contents: {
        type: Object,
        required: true,
    },
});

export default mongoose.model('HeadingTag', HeadingTagSchema);
