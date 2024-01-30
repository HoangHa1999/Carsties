/** @type {import('next').NextConfig} */

const hostnames = [
  'cdn.pixabay.com',
  ];

const nextConfig = {  
      images: {
        remotePatterns: hostnames.map(hostname => ({
            protocol: 'https',
            hostname,
            pathname: '**',
        }))
      },
    output: "standalone",
};

module.exports = nextConfig;
