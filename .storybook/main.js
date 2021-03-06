const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.js"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-links"
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: "postcss-loader",
          options: {
            ident: "postcss",
            plugins: [require("tailwindcss"), require("autoprefixer")]
          }
        }
      ],
      include: path.resolve(__dirname, "../")
    });
    return config;
  }
};
