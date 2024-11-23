import mongoose from 'mongoose';

const connectDB = async () => {
    const { MONGO_HOST, MONGO_PORT, MONGO_DB, MONGO_USER, MONGO_PASS, MONGO_AUTH_SOURCE } = process.env;
    const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONGO_AUTH_SOURCE}`;

    try {
        await mongoose.connect(mongoURI);
        console.log(`MongoDB ${MONGO_HOST}:${MONGO_PORT} üzerinde çalışıyor.`);
    } catch (error) {
        console.error('MongoDB bağlantı hatası:', error.message);
        process.exit(1);    
    }
};

export default connectDB;