/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,

  images: {
    domains: [
      'i.imgur.com',
      'images.unsplash.com',
      'res.cloudinary.com',
      'arivaygfvkxrfroiglgv.supabase.co',
    ],
  },

  webpack(config, { isServer }) {
    // Existing SVGR loader configuration
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    // Additional configuration to not attempt to polyfill `fs` module on the client-side
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};

module.exports = nextConfig;
