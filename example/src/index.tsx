import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, Text, Button } from "react-native";
import Zebra from "@h4nyu/react-native-zebra-rfid";
import Toast from 'react-native-toast';
console.log("---NativeModules---")
// console.log(NativeModules)
console.log("---Toast---")
console.log(Toast)
console.log("---Zebra---")
console.log(Zebra)
console.log("---NativeModules---")


type State = {
  tagId: string;
}

class TestRfid extends React.Component<{}, State> {
  state: State = {
    tagId: "",
  };


  handleGetDevices = async () => {
    // const devices = await getAvailableDevices();
    // this.setState({
    //   ...this.state,
    // });
  };

  render = () => {
    const { tagId } = this.state;
    return (
      <View>
        <Button title="getAvailableDevices" onPress={this.handleGetDevices} />
      </View>
    );
  };
}


storiesOf('TestRfid', module).add('default', () => (
  <TestRfid />
));
