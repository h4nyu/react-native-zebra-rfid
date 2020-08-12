
# @oniku/react-native-zebra-rfid

## Getting started

`$ npm install @oniku/react-native-zebra-rfid --save`

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

## Build Demo App

### build docker image and enter the container.
```
docker-compose build
docker-compose run --rm app bash
```

### build apk

apk is saved at `example/android/app/build/outputs/apk/debug/app-debug.apk`.

```sh
yarn install
yarn build-android
```
