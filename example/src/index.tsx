import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, Text, Button } from "react-native";
import {
  ZebraRfidReceiver,
  getAvailableDevices,
  connect,
  disconnect,
  IDevice,
  setMode,
  setPower,
} from "@h4nyu/react-native-zebra-rfid";

type State = {
  devices: IDevice[];
  tagId: string;
}

class TestRfid extends React.Component<{}, State> {
  state: State = {
    devices: [],
    tagId: "",
  };

  handleConnect = async () => {
    if (this.state.devices.length > 0) {
      await connect(this.state.devices[0].name);
    }
  };
  handleRfidRead = (tagId:string) => {
    this.setState({
      ...this.state,
      tagId: tagId
    });
      
  }

  handleGetDevices = async () => {
    const devices = await getAvailableDevices();
    this.setState({
      ...this.state,
      devices: devices
    });
  };

  handleDisconnect = async () => {
    if (this.state.devices.length > 0) {
      await disconnect(this.state.devices[0].name);
    }
  };
  handleModeRfid = () => {
    setMode("RFID");
  };

  handleModeBarcode = () => {
    setMode("BARCODE");
  };
  render = () => {
    const { devices, tagId } = this.state;
    return (
      <View>
        {devices.map((x: IDevice) => (
          <Text key={x.name}>{x.name}</Text>
        ))}
        <Button title="getAvailableDevices" onPress={this.handleGetDevices} />
        <Button title="connect" onPress={this.handleConnect} />

        <Button title="disconnect" onPress={this.handleDisconnect} />

        <Text>tagId: {tagId}</Text>
        <Button title="mode RFID" onPress={this.handleModeRfid} />

        <Button title="mode BARCODE" onPress={this.handleModeBarcode} />

        <Button title="power 10" onPress={() => setPower(10)} />

        <Button title="power 30" onPress={() => setPower(30)} />

        <Button title="power 50" onPress={() => setPower(50)} />

        <Button title="power 200" onPress={() => setPower(200)} />
        <ZebraRfidReceiver
          onRfidRead={this.handleRfidRead}
          onAppeared={console.debug}
          onDisappeared={console.debug}
        />
      </View>
    );
  };
}


storiesOf('TestRfid', module).add('default', () => (
  <TestRfid />
));
