/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint:{
    ignoreDuringBuilds:true
  },
  reactStrictMode: false, // Disable React Strict Mode in development

  // Specify the domains that can load images
  images: {
    domains: ['localhost', 'flowbite.s3.amazonaws.com', 'madebydesignesia.com'], // Combine all domains in one array
  },

  api: {
    bodyParser: false, // Disable bodyParser for API routes
  },
};

// Use ES module export syntax
export default nextConfig;
