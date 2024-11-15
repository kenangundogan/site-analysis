import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    resultsDir: process.env.RESULTS_DIR || './dist',
    serverUrl: process.env.SERVER_URL || 'http://localhost',
};

export default config;
