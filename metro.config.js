const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.transformer = {
  ...defaultConfig.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
  ext => ext !== 'svg',
);

defaultConfig.resolver.sourceExts = [
  ...defaultConfig.resolver.sourceExts,
  'svg',
];

module.exports = mergeConfig(defaultConfig, {});
