module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@oniku/react-native-zebra-rfid": "./src",
        },
        cwd: "babelrc"
      }
    ]
  ]
};
