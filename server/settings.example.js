module.exports = {
    bunyan: {
        name: 'samklang-dev',
        level: 'debug',
    },
    mongo: {
        servers: ['mongodb://localhost/samklang'],
        replset: null,
    },
    locales: ['en', 'nb'],
    defaultLocale: 'en',
};
