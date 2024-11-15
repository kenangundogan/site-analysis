import fs from 'fs';
import path from 'path';
import config from '../config/index.js';

const createResultsDir = () => {
    if (!fs.existsSync(config.resultsDir)) {
        fs.mkdirSync(config.resultsDir);
    }
};

const generateFileName = (scanId) => {
    return path.join(config.resultsDir, `${scanId}.json`);
};

const writeToFile = (fileName, data) => {
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2), 'utf8');
};

const readFromFile = (fileName) => {
    return JSON.parse(fs.readFileSync(fileName, 'utf8'));
};

const getAllScans = () => {
    const files = fs
        .readdirSync(config.resultsDir)
        .filter((file) => file.endsWith('.json'))
        .sort((a, b) => b.localeCompare(a));

    const scans = files.map((file) => {
        const scanId = path.basename(file, '.json');

        try {
            const data = readFromFile(path.join(config.resultsDir, file));
            if (!data.links || !Array.isArray(data.links)) {
                throw new Error('Dosya yapısı geçersiz: `links` alanı eksik veya hatalı');
            }

            const isCompleted = data.links.every(
                (link) => link.status && link.status.code !== null,
            );
            const startDate = data.date?.start || data.links[0]?.date.start || null;
            const endDate = data.date?.end || null;
            const duration = data.date?.duration || null;

            return {
                status: isCompleted ? 'completed' : 'ongoing',
                message: isCompleted ? 'Tarama tamamlandı' : 'Tarama devam ediyor',
                scanId,
                url: data.url,
                baseurl: data.baseurl,
                totalLinks: data.totalLinks,
                response: data.response,
                reportLink: `${config.serverUrl}:${config.port}/scans/${scanId}`,
                date: {
                    start: startDate,
                    end: endDate,
                    duration: duration,
                },
            };
        } catch (error) {
            console.error(`Dosya okunurken hata oluştu (${file}): ${error.message}`);
            return null;
        }
    });

    return scans.filter((scan) => scan !== null);
};

const getScanReport = (scanId) => {
    const fileName = generateFileName(scanId);
    if (!fs.existsSync(fileName)) {
        return null;
    }
    return readFromFile(fileName);
};

export default {
    createResultsDir,
    generateFileName,
    writeToFile,
    readFromFile,
    getAllScans,
    getScanReport,
};
