const getApiInfo = (req, res) => {
    res.json({
        message: 'Hoş geldiniz! Bu API tarama işlemleri için kullanılır.',
        endpoints: [
            {
                method: 'POST',
                endpoint: '/scans',
                description: 'Yeni bir tarama başlatır.',
                requiredParameters: [
                    { name: 'url', type: 'string', description: 'Taranacak sayfanın URL\'si' },
                    { name: 'baseurl', type: 'string', description: 'Linklerin tamamlanması için kullanılan temel URL' },
                ],
                optionalParameters: [
                    { name: 'header', type: 'string', description: 'Kullanılacak header tipi (mobile, desktop, tablet, random)' },
                    { name: 'content', type: 'boolean', description: 'Sayfa içeriğini almak için' },
                    { name: 'headMeta', type: 'boolean', description: 'Meta etiketlerini almak için' },
                ],
                exampleRequest: {
                    method: 'POST',
                    endpoint: '/scans',
                    body: {
                        "url": "https://example.com",
                        "baseurl": "https://example.com",
                        "header": "mobile",
                        "content": true,
                        "headMeta": true
                    }
                }
            },
            {
                method: 'GET',
                endpoint: '/scans',
                description: 'Mevcut tüm taramaları listeler.',
                exampleRequest: {
                    method: 'GET',
                    endpoint: '/scans'
                }
            },
            {
                method: 'GET',
                endpoint: '/scans/:scanId',
                description: 'Belirtilen scanId\'ye ait tarama raporunu döndürür.',
                exampleRequest: {
                    method: 'GET',
                    endpoint: '/scans/2024-11-15T13-01-00-322Z-uuid'
                }
            },
        ],
    });
};

export default {
    getApiInfo,
};
