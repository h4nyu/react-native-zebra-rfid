module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@h4nyu/react-native-zebra-rfid": "./src/index.ts",
          "react-native-toast": "./react-native-toast/index.js",
        },
        cwd: "babelrc"
      }
    ]
  ]
};
