
# @h4nyu/react-native-zebra-rfid

## Getting started

`$ npm install @h4nyu/react-native-zebra-rfid --save`

#### Android
1. Check minSdkVersion in `android/build.gradle`:
  	```
    buildscript {
        ...
        ext {
            ...
            minSdkVersion = 19
        }
    }

  	```

1. Insert the following lines inside the dependencies block in `android/build.gradle`:
  	```gradle
    allprojects {
        repositories {
            ...
            flatDir { dirs "$rootDir/../node_modules/@h4nyu/react-native-zebra-rfid/android/libs" }
        }
    }
  	```
## Usage

see [example](./example/App.tsx).
