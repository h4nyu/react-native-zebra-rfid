npx react-native link \
&& npx react-native bundle --platform android --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ $@ \
&& npx jetify \
&& cd android \
&& ./gradlew assembleDebug --info

