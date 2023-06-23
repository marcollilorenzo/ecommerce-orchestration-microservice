/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/api/products',
            headers: [
                /// no cache
              {
                key: 'cache-control',
                value: 'no-cache no-store must-revalidate max-age=0 s-maxage=0',
              }
            ],
          },
        ]
      },
    
}


module.exports = nextConfig


