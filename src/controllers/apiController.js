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
                    { name: 'headers', type: 'boolean', description: 'Response header bilgilerini alır' },
                    { name: 'headingTag', type: 'boolean', description: 'Heading etiketlerini tarar' },
                    { name: 'linkTag', type: 'boolean', description: 'Link etiketlerini tarar' },
                    { name: 'metaTag', type: 'boolean', description: 'Meta etiketlerini tarar' },
                    { name: 'openGraphTag', type: 'boolean', description: 'Open Graph etiketlerini tarar' },
                    { name: 'twitterCardTag', type: 'boolean', description: 'Twitter Card etiketlerini tarar' },
                    { name: 'aTag', type: 'boolean', description: 'A etiketlerini tarar' },
                    { name: 'imgTag', type: 'boolean', description: 'Img etiketlerini tarar' },
                    { name: 'videoTag', type: 'boolean', description: 'Video etiketlerini tarar' },
                    { name: 'domDepth', type: 'boolean', description: 'Dom derinliğini ağaç yapısına göre tarar' },
                    { name: 'styleTag', type: 'boolean', description: 'Style etiketlerini tarar' },
                    { name: 'scriptTag', type: 'boolean', description: 'Script etiketlerini tarar' },
                    { name: 'structuredDataTag', type: 'boolean', description: 'Structured Data etiketlerini tarar' },
                    { name: 'trackingCode', type: 'boolean', description: 'Tracking kodlarını tarar' },
                ],
                exampleRequest: {
                    method: 'POST',
                    endpoint: '/scans',
                    body: {
                        "url": "https://example.com",
                        "baseUrl": "https://example.com",
                        "header": "desktop",
                        "headers": true,
                        "headingTag": true,
                        "linkTag": true,
                        "metaTag": true,
                        "openGraphTag": true,
                        "twitterCardTag": true,
                        "aTag": true,
                        "imgTag": true,
                        "videoTag": true,
                        "domDepth": true,
                        "styleTag": true,
                        "scriptTag": true,
                        "structuredDataTag": true,
                        "trackingCode": true
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
                description: 'Belirli bir tarama raporunu getirir.',
                exampleRequest: {
                    method: 'GET',
                    endpoint: '/scans/60f1b7d3c3f5e80015f4d7a2'
                }
            },
            {
                method: 'GET',
                endpoint: '/scans/:scanId/links/:linkId/{param}',
                description: 'Belirli bir tarama ve link için belirtilen parametreyi getirir.',
                exampleRequest: {
                    method: 'GET',
                    endpoint: '/scans/60f1b7d3c3f5e80015f4d7a2/links/60f1b7d3c3f5e80015f4d7a2/{param}'
                }
            }
        ],
    });
};

export default {
    getApiInfo,
};
