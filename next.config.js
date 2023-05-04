/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/lists',
                permanent: true,
            }
        ]
    },
    // i18n: {
    //     locales: ['en', 'pl'],
    //     defaultLocale: 'en',
    // }
}

module.exports = nextConfig
