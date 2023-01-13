/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // to powinno zwiększać wydajność apki modyfikując importy ikon fontawesome ale nie bangla :c
    // modularizeImports: {
    //     '@fortawesome/free-regular-svg-icons': {
    //         transform: '@fortawesome/free-regular-svg-icons/{{member}}',
    //     },
    //     '@fortawesome/free-solid-svg-icons': {
    //         transform: '@fortawesome/free-solid-svg-icons/{{member}}',
    //     }
    // }
    //języki:
    // i18n: {
    //     locales: ['en', 'pl'],
    //     defaultLocale: 'en',
    // }
}

module.exports = nextConfig
