const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// ADD THESE 2 PROPERTIES
config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = [
  "react-native",
  "browser",
  "require",
];

module.exports = withNativeWind(config, { input: "./src/global.css" });
