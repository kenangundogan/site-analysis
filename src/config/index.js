import dotenv from 'dotenv';

dotenv.config();

const config = {
    serverPort: process.env.SERVER_PORT,
    serverUrl: process.env.SERVER_URL,
};

export default config;
