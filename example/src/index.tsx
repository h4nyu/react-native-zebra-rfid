import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, Text, Button } from "react-native";
import Zebra from "@h4nyu/react-native-zebra-rfid";
// console.log("---NativeModules---")
// // console.log(NativeModules)
console.log("---Zebra---")
console.log(Zebra)
console.log("---Toast---")
// console.log("---NativeModules---")
//
//
const HLine = () => <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>

type State = {
  tagId: string;
  devices: Zebra.Device[];
  deviceName: string;
}

class TestRfid extends React.Component<{}, State> {
  state: State = {
    tagId: "",
    devices: [],
    deviceName: "",
  };


  handleGetDevices = async () => {
    const devices = await Zebra.getAvailableDevices();
    this.setState({
      ...this.state,
      devices,
    });
  };
  handleConnect = async () => {
    const {devices} = this.state;
    try{
      await Zebra.connect(devices[0].name);
      this.deviceName = devices[0].name;
    }catch {
      console.warn('connection fail')
    }

  }

  render = () => {
    const { tagId, devices, deviceName } = this.state;
    return (
      <View>
        <Button title="getAvailableDevices" onPress={this.handleGetDevices} />
        {
          devices.map(x => <Text>name: {x.name}, address: {x.address}</Text>)
        }
        <HLine/>

        <Button title="connect" onPress={this.handleConnect} />
        <Text>connectedNme: {deviceName}</Text>
        <HLine/>

      </View>
    );
  };
}


storiesOf('TestRfid', module).add('default', () => (
  <TestRfid />
));
