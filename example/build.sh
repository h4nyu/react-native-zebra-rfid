yarn react-native link
yarn react-native bundle --platform android --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ $@

yarn jetify
cd android
keytool -genkey -v -keystore app/debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "C=US, O=Android, CN=Android Debug"
./gradlew assembleDebug
