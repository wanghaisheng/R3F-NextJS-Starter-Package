const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * A fork of 'next-pwa' that has app directory support
 * @see https://github.com/shadowwalker/next-pwa/issues/424#issuecomment-1332258575
 */
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const copyPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/Workers'),
      to: '../public/Cesium/Workers',
    },
    {
      from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/ThirdParty'),
      to: '../public/Cesium/ThirdParty',
    },
    {
      from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/Assets'),
      to: '../public/Cesium/Assets',
    },
    {
      from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/Widgets'),
      to: '../public/Cesium/Widgets',
    },
  ],
})

const nextConfig = {
  // uncomment the following snippet if using styled components
  // compiler: {
  //   styledComponents: true,
  // },
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'models.readyplayer.me',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
        port: '',
        pathname: '/vrscout.com/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      // We're in the browser build, so we can safely exclude the sharp module
      config.externals.push('sharp')
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.module = true
        }
      })
      // config.plugins.push(
      //   new CopyWebpackPlugin({
      //     patterns: [
      //       {
      //         from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/Workers'),
      //         to: '../public/Cesium/Workers',
      //       },
      //       {
      //         from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/ThirdParty'),
      //         to: '../public/Cesium/ThirdParty',
      //       },
      //       {
      //         from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/Assets'),
      //         to: '../public/Cesium/Assets',
      //       },
      //       {
      //         from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/Widgets'),
      //         to: '../public/Cesium/Widgets',
      //       },
      //     ],
      //   }),
      // )
      config.plugins.push(
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify('/Cesium'),
        }),
      )
    }
    // audio support
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    })

    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    })

    return config
  },
}

const KEYS_TO_OMIT = ['webpackDevMiddleware', 'configOrigin', 'target', 'analyticsId', 'webpack5', 'amp', 'assetPrefix']
const { hostname } = require('os')

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [[withPWA], [withBundleAnalyzer, {}]]

  const wConfig = plugins.reduce(
    (acc, [plugin, config]) => {
      const plugins = Array.isArray(acc.plugins) ? [...acc.plugins] : []
      return plugin({ ...acc, ...config, plugins: [...plugins, copyPlugin] })
    },
    {
      ...defaultConfig,
      ...nextConfig,
    },
  )

  // Additional configuration
  const additionalConfig = {
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
  }

  const finalConfig = { ...wConfig, ...additionalConfig }

  // Optionally, if you want to omit certain keys
  const KEYS_TO_OMIT = [] // Add keys you want to omit here if needed
  Object.keys(finalConfig).forEach((key) => {
    if (!KEYS_TO_OMIT.includes(key)) {
      finalConfig[key] = wConfig[key]
    }
  })

  return finalConfig
}
