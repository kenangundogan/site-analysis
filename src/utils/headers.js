const mobileHeaders = [
    {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15A372 Safari/604.1',
        'Accept-Language': 'en-US,en;q=0.8',
        'Accept': 'application/json, text/plain, */*',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Mobile Safari/537.36',
        'Accept-Language': 'es-ES,es;q=0.7',
        'Accept': 'application/json, text/html',
        'Connection': 'close',
    },
    {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15A372 Safari/604.1',
        'Accept-Language': 'fr-FR,fr;q=0.9',
        'Accept': 'text/html, application/xhtml+xml',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36',
        'Accept-Language': 'de-DE,de;q=0.8',
        'Accept': 'application/xml, text/plain',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.5 Mobile/15E148 Safari/604.1',
        'Accept-Language': 'it-IT,it;q=0.7',
        'Accept': 'application/json, application/xml',
        'Connection': 'close',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 9; Pixel 3a Build/PD2A.190115.032) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.90 Mobile Safari/537.36',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Accept': 'application/json',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.4 Mobile/15G77 Safari/604.1',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept': 'text/html',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; Nexus 6P Build/OPM6.171019.030) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36',
        'Accept-Language': 'nl-NL,nl;q=0.6',
        'Accept': 'application/json, text/html',
        'Connection': 'close',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 7.0; LG-H870 Build/NRD90U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.132 Mobile Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.8',
        'Accept': 'application/xml',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5 Build/M4B30Z) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36',
        'Accept-Language': 'ru-RU,ru;q=0.9',
        'Accept': 'text/plain, */*',
        'Connection': 'keep-alive',
    },
];

const desktopHeaders = [
    {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'Accept-Language': 'es-ES,es;q=0.7',
        'Accept': 'application/json, text/html',
        'Connection': 'close',
    },
    {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0',
        'Accept-Language': 'fr-FR,fr;q=0.8',
        'Accept': 'application/xml, */*',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0',
        'Accept-Language': 'de-DE,de;q=0.6',
        'Accept': 'text/html, */*',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
        'Accept-Language': 'it-IT,it;q=0.9',
        'Accept': 'application/xhtml+xml,application/json',
        'Connection': 'close',
    },
    {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
        'Accept-Language': 'pt-PT,pt;q=0.5',
        'Accept': 'text/plain, application/json',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        'Accept-Language': 'nl-NL,nl;q=0.7',
        'Accept': 'application/xml, */*',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15',
        'Accept-Language': 'ru-RU,ru;q=0.6',
        'Accept': 'application/json, text/html',
        'Connection': 'close',
    },
    {
        'User-Agent': 'Mozilla/5.0 (X11; Linux i686; rv:45.0) Gecko/20100101 Firefox/45.0',
        'Accept-Language': 'ja-JP,ja;q=0.9',
        'Accept': 'text/html',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/18.18363',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Accept': 'application/xml, text/plain',
        'Connection': 'keep-alive',
    },
];

const tabletHeaders = [
    {
        'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)',
        'Accept-Language': 'en-US,en;q=0.8',
        'Accept': 'application/json, text/plain',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Android 9; Tablet; rv:68.0) Gecko/68.0 Firefox/68.0',
        'Accept-Language': 'fr-FR,fr;q=0.7',
        'Accept': 'text/html, application/json',
        'Connection': 'close',
    },
    {
        'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.3 Mobile/15E148 Safari/604.1',
        'Accept-Language': 'es-ES,es;q=0.6',
        'Accept': 'application/xml, text/html',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Android 8.1.0; Tablet; rv:60.0) Gecko/60.0 Firefox/60.0',
        'Accept-Language': 'de-DE,de;q=0.9',
        'Accept': 'application/json, */*',
        'Connection': 'close',
    },
    {
        'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.4 Mobile/15G77 Safari/604.1',
        'Accept-Language': 'it-IT,it;q=0.8',
        'Accept': 'text/html, application/json',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Android 7.0; Tablet; rv:53.0) Gecko/53.0 Firefox/53.0',
        'Accept-Language': 'pt-BR,pt;q=0.7',
        'Accept': 'application/xml',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        'Accept-Language': 'ru-RU,ru;q=0.6',
        'Accept': 'application/json, text/plain',
        'Connection': 'close',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Android 6.0.1; Tablet; rv:49.0) Gecko/49.0 Firefox/49.0',
        'Accept-Language': 'en-GB,en;q=0.7',
        'Accept': 'text/html',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 10_3 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.3 Mobile/14E277 Safari/602.1',
        'Accept-Language': 'nl-NL,nl;q=0.5',
        'Accept': 'application/xml, application/json',
        'Connection': 'keep-alive',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Android 5.1.1; Tablet; rv:41.0) Gecko/41.0 Firefox/41.0',
        'Accept-Language': 'ja-JP,ja;q=0.9',
        'Accept': 'text/plain, */*',
        'Connection': 'close',
    },
];

// Tüm header setlerini bir araya getiriyoruz
const allHeaders = [...mobileHeaders, ...desktopHeaders, ...tabletHeaders];

// Varsayılan header
const defaultHeader = {
    'User-Agent': 'axios/1.4.0',
    'Accept': 'application/json, text/plain, */*, application/xml;q=0.7',
    'Connection': 'keep-alive, Upgrade',
};

export default {
    mobileHeaders,
    desktopHeaders,
    tabletHeaders,
    allHeaders,
    defaultHeader,
};
