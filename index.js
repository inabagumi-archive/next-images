/* eslint-disable @typescript-eslint/explicit-function-return-type */

module.exports = (nextConfig = {}) => {
  const svgrOptions = Object.assign({}, nextConfig.svgrOptions || {}, {
    babel: false
  })

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(?:gif|jpe?g|png|webp)$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: 'url-loader',
            options: {
              esModule: true,
              limit: 8192,
              name: options.dev
                ? '[name].[ext]?[contenthash:8]'
                : '[name].[contenthash:8].[ext]',
              outputPath: 'static/images',
              publicPath: '/_next/static/images'
            }
          }
        ]
      })

      config.module.rules.push({
        test: /\.svg$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@svgr/webpack',
            options: svgrOptions
          }
        ]
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
