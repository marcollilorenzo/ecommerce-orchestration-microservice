/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/api/products',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store'
                    },
                    {
                        key: 'Pragma',
                        value: 'no-cache'
                    },
                    {
                        key: 'Expires',
                        value: '0'
                    }
                ],
            },
        ]
    },

}


module.exports = nextConfig


