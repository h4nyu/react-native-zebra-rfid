import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, Text, Button } from "react-native";
import Zebra, {Receiver} from "@h4nyu/react-native-zebra-rfid";
const HLine = () => <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    margin: 5,
  }}
/>

type State = {
  tagId: string;
  devices: Zebra.Device[];
  deviceName: string | null;
  mode: string;
  tagIds: string[];
}

class TestRfid extends React.Component<{}, State> {
  state: State = {
    tagIds: [],
    devices: [],
    deviceName: null,
    mode: "RFID"
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

  handleSetRfidMode = async () => {
    const {devices} = this.state;
    try{
      const mode = await Zebra.setMode("RFID");
      this.setState({
        ...this.state,
        mode,
      });
    }catch {
      console.warn('set rfid mode fail')
    }
  }

  handleSetBarcodeMode = async () => {
    const {devices} = this.state;
    try{
      const mode = await Zebra.setMode("BARCODE");
      this.setState({
        ...this.state,
        mode,
      });
    }catch {
      console.warn('set barcode mode fail')
    }
  }

  handleRfidRead = async (tagIds: string[]) => {
    this.setState({
      ...this.state,
      tagIds,
    });
  }

  render = () => {
    const { tagId, devices, deviceName, mode, tagIds } = this.state;
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

        <Button title="rfid mode" onPress={this.handleSetRfidMode} />
        <Button title="barcode mode" onPress={this.handleSetBarcodeMode} />
        <Text>mode: {mode}</Text>
        <HLine/>

        <Text>tagIds</Text>
        {
          tagIds.map(x => <Text key={x}>{x}</Text>)
        }
        <HLine/>

        <Receiver
          onRfidRead={this.handleRfidRead}
          onAppeared={console.info}
          onDisappeared={console.info}
        />
      </View>
    );
  };
}


storiesOf('TestRfid', module).add('default', () => (
  <TestRfid />
));
