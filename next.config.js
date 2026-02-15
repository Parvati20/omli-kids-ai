// /** @type {import('next').NextConfig} */
// const nextConfig = {
// 	webpack(config) {
// 		config.module.exprContextCritical = false;
// 		config.module.unknownContextCritical = false;
// 		config.module.wrappedContextCritical = false;
// 		config.ignoreWarnings = [
// 			...(config.ignoreWarnings || []),
// 			{
// 				module: /onnxruntime-web[\\/].*\.js$/,
// 				message: /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/, 
// 			},
// 		];
// 		return config;
// 	},
// };

// module.exports = nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["speech-to-speech"],
  },
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
    };

    config.resolve.fallback = {
      fs: false,
      path: false,
      crypto: false,
    };

    return config;
  },
};

module.exports = nextConfig;
