import { NativeModules, DeviceEventEmitter } from 'react-native';
const { RNZebraRfid } = NativeModules;

export interface IDevice {
  name: string;
  address: string;
}

export type Mode = "RFID" | "BARCODE";

export const connect: (deviceName: string) => Promise<string> = RNZebraRfid.connect;
export const disconnect: (deviceName: string) => Promise<string>  = RNZebraRfid.disconnect;
export const getAvailableDevices: () => Promise<IDevice[]> = RNZebraRfid.getAvailableDevices;
export const setMode:(mode:Mode) => Promise<Mode> = RNZebraRfid.setMode;
export const setPower:(power:number) => Promise<number> = RNZebraRfid.setPower;

export * from './Receiver'
