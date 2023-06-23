/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/api/products',
            headers: [
              {
                key: 'cache-control',
                value: 'no-cache',
              },
            ],
          },
        ]
      },
    
}


module.exports = nextConfig


