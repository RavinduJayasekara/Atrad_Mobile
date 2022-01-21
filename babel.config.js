module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

// module.exports = {
//   presets: ["@babel/preset-env", "@babel/preset-react"],
//   env: {
//     test: {
//       plugins: ["@babel/plugin-transform-runtime"],
//     },
//   },
// };

// module.exports = {
//   preset: "react-native",
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//   transformIgnorePatterns: [
//     "node_modules/(?!(react-native" +
//       "|react-navigation-tabs" +
//       "|react-native-splash-screen" +
//       "|react-native-screens" +
//       "|react-native-reanimated" +
//       ")/)",
//   ],
// };
