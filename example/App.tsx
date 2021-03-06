import React from 'react';
import { View, Text, Button, TextInput } from "react-native";
import * as Zebra from "@oniku/react-native-zebra-rfid";
import {Set} from "immutable";

const HLine = () => <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    margin: 5,
  }}
/>

type State = {
  devices: Zebra.Device[];
  deviceName: string | null;
  mode: string;
  tagIds: Set<string>;
  power:number;
}

export default class App extends React.Component<{}, State> {
  state: State = {
    tagIds: Set(),
    devices: [],
    deviceName: null,
    mode: "RFID",
    power: 100,
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

  handleRfidRead = async (ids: string[]) => {
    let {tagIds} = this.state;
    this.setState({
      ...this.state,
      tagIds: tagIds.merge(Set(ids))
    });
  }

  resetTagIds = async () => {
    this.setState({
      ...this.state,
      tagIds: Set()
    });
  }

  handleOnPowerInput = (text:string) => {
    let num = parseInt(text);
    this.setState({
      ...this.state,
      power: isNaN(num) ? 0 : num,
    });
  }

  setPower = async () => {
    const {power} = this.state;
    try{
      await Zebra.setPower(power);
    } catch {
      console.warn('setPower fail')
    }
  }

  render = () => {
    const { devices, deviceName, mode, tagIds, power } = this.state;
    return (
      <View>
        <Button title="getAvailableDevices" onPress={this.handleGetDevices} />
        {
          devices.map(x => 
            <View key={x.name}>
              <Text>name: {x.name}</Text>
              <Text>address: {x.address}</Text>
            </View>
          )
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

        <TextInput onChangeText={this.handleOnPowerInput} keyboardType={"numeric"} value={power.toString()} />
        <Button title="set power" onPress={() => this.setPower()} />
        <HLine/>

        <Button title="reset tagIds" onPress={this.resetTagIds} />
        <Text>tagIds: {tagIds.size} tags</Text>
        {
          tagIds.map(x => <Text key={x}>{x}</Text>)
        }
        <HLine/>

        <Zebra.Receiver
          onRfidRead={this.handleRfidRead}
          onAppeared={console.info}
          onDisappeared={console.info}
        />
      </View>
    );
  };
}
