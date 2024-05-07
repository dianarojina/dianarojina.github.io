// const nextConfig = {
//   output: 'export'
// }
// module.exports = nextConfig

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
      ],
      include: /\.module\.css$/,
    });
    return config;
  },
};

module.exports = nextConfig;