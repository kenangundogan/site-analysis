import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB ${process.env.MONGO_URI} üzerinde çalışıyor.`);
    } catch (error) {
        console.error('MongoDB bağlantı hatası:', error.message);
        process.exit(1);
    }
};

export default connectDB;
