
# react-native-zebra-rfid

## Getting started

`$ npm install react-native-zebra-rfid --save`

### Mostly automatic installation

`$ react-native link react-native-zebra-rfid`

### Manual installation

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNZebraRfidPackage;` to the imports at the top of the file
  - Add `new RNZebraRfidPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-zebra-rfid'
  	project(':react-native-zebra-rfid').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-zebra-rfid/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-zebra-rfid')
  	```
## Usage
```javascript
import RNZebraRfid from 'react-native-zebra-rfid';

// TODO: What to do with the module?
RNZebraRfid;
```
  
