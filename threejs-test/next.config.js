/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // uncomment the following snippet if using styled components
  // compiler: {
  //   styledComponents: true,
  // },
  webpack(config, { isServer }) {
    if (!isServer) {
      // We're in the browser build, so we can safely exclude the sharp module
      config.externals.push('sharp');
    }
    // // audio support
    // config.module.rules.push({
    //   test: /\.(ogg|mp3|wav|mpe?g)$/i,
    //   exclude: config.exclude,
    //   use: [
    //     {
    //       loader: require.resolve('url-loader'),
    //       options: {
    //         limit: config.inlineImageLimit,
    //         fallback: require.resolve('file-loader'),
    //         publicPath: `${config.assetPrefix}/_next/static/images/`,
    //         outputPath: `${isServer ? '../' : ''}static/images/`,
    //         name: '[name]-[hash].[ext]',
    //         esModule: config.esModule || false,
    //       },
    //     },
    //   ],
    // });

    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    return config;
  },
};

const KEYS_TO_OMIT = [
  'webpackDevMiddleware',
  'configOrigin',
  'target',
  'analyticsId',
  'webpack5',
  'amp',
  'assetPrefix',
];

module.exports = nextConfig;

// module.exports = (_phase, { defaultConfig }) => {
//   const plugins = [];

//   const wConfig = plugins.reduce(
//     (acc, [plugin, config]) => plugin({ ...acc, ...config }),
//     {
//       ...defaultConfig,
//       ...nextConfig,
//     }
//   );

//   const finalConfig = {};
//   Object.keys(wConfig).forEach((key) => {
//     if (!KEYS_TO_OMIT.includes(key)) {
//       finalConfig[key] = wConfig[key];
//     }
//   });

//   return finalConfig;
// };
