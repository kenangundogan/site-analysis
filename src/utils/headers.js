const mobileHeaders = [
    {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15A372 Safari/604.1',
        'Accept-Language': 'en-US,en;q=0.9',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Mobile Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
    },
    // 9 tane daha mobil header...
];

const desktopHeaders = [
    {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
        'Accept-Language': 'en-US,en;q=0.9',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'Accept-Language': 'en-US,en;q=0.9',
    },
    // 9 tane daha desktop header...
];

const tabletHeaders = [
    {
        'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)',
        'Accept-Language': 'en-US,en;q=0.9',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Android 9; Tablet; rv:68.0) Gecko/68.0 Firefox/68.0',
        'Accept-Language': 'en-US,en;q=0.9',
    },
    // 9 tane daha tablet header...
];

// Tüm header setlerini bir araya getiriyoruz
const allHeaders = [...mobileHeaders, ...desktopHeaders, ...tabletHeaders];

// Varsayılan header
const defaultHeader = {
    'User-Agent': 'axios/1.4.0',
    'Accept': 'application/json, text/plain, */*',
};

export default {
    mobileHeaders,
    desktopHeaders,
    tabletHeaders,
    allHeaders,
    defaultHeader,
};
