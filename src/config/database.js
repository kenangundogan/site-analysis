import mongoose from 'mongoose';

const connectDB = async () => {
    const { MONGO_HOST, MONGO_PORT, MONGO_DB, MONGO_USER, MONGO_PASS, MONGO_AUTH_SOURCE } = process.env;
    const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONGO_AUTH_SOURCE}`;

    try {
        await mongoose.connect(mongoURI);
        console.log(`Veritabanı bağlantısı başarılı: MongoDB ${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);

    } catch (error) {
        console.error(`Veritabanı bağlantısı başarısız: MongoDB ${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
        console.error(`Hata: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;