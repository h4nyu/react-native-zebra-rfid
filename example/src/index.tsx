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


  handleGetDevices = async () => {
    const devices = await getAvailableDevices();
    this.setState({
      ...this.state,
      devices: devices
    });
  };

  render = () => {
    const { devices, tagId } = this.state;
    return (
      <View>
        {devices.map((x: IDevice) => (
          <Text key={x.name}>{x.name}</Text>
        ))}
        <Button title="getAvailableDevices" onPress={this.handleGetDevices} />
        <ZebraRfidReceiver
          onRfidRead={console.debug}
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
