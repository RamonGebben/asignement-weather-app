import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  // Lets CI upload `.next/standalone` once and have the e2e and Lighthouse
  // jobs run it directly, without reinstalling node_modules per job.
  output: 'standalone',
};

export default nextConfig;
