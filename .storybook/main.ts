const path = require("path");

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
    "storybook-addon-next-router",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      url: false,
    },
  },
  staticDirs: ["../public"],
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config) => {
    const imageRule = config.module?.rules?.find((rule) => {
      const test = rule.test;

      if (!test) {
        return false;
      }

      return test.test(".svg");
    });

    imageRule.exclude = /\.svg$/;

    config.module?.rules?.push({
      test: /\.svg$/,
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
      type: "javascript/auto",
      issuer: {
        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
      },
    });

    return {
      ...config,
      resolve: {
        ...config.resolve,
        // next.config.js에 정의한 scss import alias
        alias: {
          "@assets": path.resolve(__dirname, "../public/assets"),
          "@components": path.resolve(__dirname, "../src/components"),
        },

        fallback: {
          util: false,
          assert: false,
          path: require.resolve("path-browserify"),
        },
      },
    };
  },

  env: (config) => ({
    ...config,
    NEXT_PUBLIC_ENV: "local",
  }),
};

export default config;
