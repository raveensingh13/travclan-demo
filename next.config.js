
const getWebpackConfig = require('./webpack.config');

module.exports = () => {
  let config = {
    webpack: getWebpackConfig,
  };

  config = { ...config };

  return {
    ...config,
    async headers() {
      return [
        {
          source: '/:all*',
          headers: [
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=63072000; includeSubdomains; preload',
            },
            {
              key: 'x-frame-options',
              value: 'SAMEORIGIN',
            },
          ],
        },
      ];
    },
  };
};
