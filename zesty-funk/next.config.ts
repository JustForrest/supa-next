import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    // Output in standalone mode for better Vercel deployment
    output: 'standalone',
    // Enable React strict mode for better development experience
    reactStrictMode: true,
    // Ensure we're on the right domain with CORS
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                ],
            },
        ]
    }
}

export default nextConfig
