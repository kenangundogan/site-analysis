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
                    { name: 'baseUrl', type: 'string', description: 'Linklerin tamamlanması için kullanılan temel URL' },
                ],
                optionalParameters: [
                    { name: 'header', type: 'string', description: 'Kullanılacak header tipi (mobile, desktop, tablet, random)' },
                    { name: 'metaTag', type: 'boolean', description: 'Meta etiketlerini almak için' },
                    { name: 'linkTag', type: 'boolean', description: 'Link etiketlerini almak için' },
                    { name: 'heading', type: 'boolean', description: 'Başlık etiketlerini (h1, h2, h3) almak için' },
                    { name: 'headers', type: 'boolean', description: 'HTTP yanıt başlıklarını almak için' },
                    { name: 'structuredData', type: 'boolean', description: 'Yapılandırılmış verileri almak için' },
                    { name: 'jsFiles', type: 'boolean', description: 'JavaScript dosyalarını almak için' },
                    { name: 'cssFiles', type: 'boolean', description: 'CSS dosyalarını almak için' },
                    { name: 'tracking', type: 'boolean', description: 'İzleme kodlarını almak için' },
                    { name: 'ogTags', type: 'boolean', description: 'Open Graph etiketlerini almak için' },
                    { name: 'twitterTags', type: 'boolean', description: 'Twitter kartı etiketlerini almak için' },
                ],
                exampleRequest: {
                    method: 'POST',
                    endpoint: '/scans',
                    body: {
                        "url": "https://example.com",
                        "baseUrl": "https://example.com",
                        "header": "mobile",
                        "metaTag": true,
                        "linkTag": true,
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
