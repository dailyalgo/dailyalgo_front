const path = require("node:path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "src/styles/abstracts/_variables.scss";
                  @import "src/styles/abstracts/_mixin.scss";
                  @import "src/styles/abstracts/_typography.scss";
                  `,
  },
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (resource.endsWith(".stories.tsx")) return true;

          return false;
        },
      })
    );
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });
    // scss import alias
    config.resolve.alias = {
      ...config.resolve.alias,
      "@assets": path.resolve(__dirname, "public/assets"),
    };
    return config;
  },
};

module.exports = nextConfig;
