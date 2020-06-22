import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, Text, Button } from "react-native";
import Zebra from "@h4nyu/react-native-zebra-rfid";
const HLine = () => <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>

type State = {
  tagId: string;
  devices: Zebra.Device[];
  deviceName: string | null;
}

class TestRfid extends React.Component<{}, State> {
  state: State = {
    tagId: "",
    devices: [],
    deviceName: null,
  };


  handleGetDevices = async () => {
    const devices = await Zebra.getAvailableDevices();
    this.setState({
      ...this.state,
      devices,
    });
  };
  handleDisconnect = async () => {
    const {devices, deviceName} = this.state;
    if (deviceName === null){
      return
    }
    try{
      await Zebra.disconnect(deviceName);
      this.setState({
        ...this.state,
        deviceName: null,
      });
    }catch {
      console.warn('disconnect fail')
    }
  }

  handleConnect = async () => {
    const {devices} = this.state;
    try{
      const deviceName = await Zebra.connect(devices[0].name);
      this.setState({
        ...this.state,
        deviceName,
      });
    }catch {
      console.warn('connect fail')
    }
  }

  render = () => {
    const { tagId, devices, deviceName } = this.state;
    return (
      <View>
        <Button title="getAvailableDevices" onPress={this.handleGetDevices} />
        {
          devices.map(x => <Text key={x.name}>name: {x.name}, address: {x.address}</Text>)
        }
        <HLine/>

        <Button title="connect" onPress={this.handleConnect} />
        <Text>connectedNme: {deviceName}</Text>
        <HLine/>

        <Button title="disconnect" onPress={this.handleDisconnect} />
        <HLine/>

      </View>
    );
  };
}


storiesOf('TestRfid', module).add('default', () => (
  <TestRfid />
));
