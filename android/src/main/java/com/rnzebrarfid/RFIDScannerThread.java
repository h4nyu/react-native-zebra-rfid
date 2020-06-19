package com.rnzebrarfid;
import com.zebra.rfid.api3.RfidEventsListener;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.Promise;

import com.zebra.rfid.api3.Readers.RFIDReaderEventHandler;
import com.zebra.rfid.api3.TagData;
import com.zebra.rfid.api3.Readers;
import com.zebra.rfid.api3.RfidReadEvents;
import com.zebra.rfid.api3.RfidStatusEvents;
import com.zebra.rfid.api3.ReaderDevice;
import com.zebra.rfid.api3.OperationFailureException;
import com.zebra.rfid.api3.InvalidUsageException;
import com.zebra.rfid.api3.BEEPER_VOLUME;
import com.zebra.rfid.api3.ACCESS_OPERATION_CODE;
import com.zebra.rfid.api3.ACCESS_OPERATION_STATUS;
import com.zebra.rfid.api3.HANDHELD_TRIGGER_EVENT_TYPE;
import com.zebra.rfid.api3.ENUM_TRANSPORT;
import com.zebra.rfid.api3.START_TRIGGER_TYPE;
import com.zebra.rfid.api3.STATUS_EVENT_TYPE;
import com.zebra.rfid.api3.STOP_TRIGGER_TYPE;
import com.zebra.rfid.api3.ENUM_TRIGGER_MODE;
import com.zebra.rfid.api3.WRITE_FIELD_CODE;
import com.zebra.rfid.api3.MEMORY_BANK;
import com.zebra.rfid.api3.SESSION;
import com.zebra.rfid.api3.INVENTORY_STATE;
import com.zebra.rfid.api3.SL_FLAG;
import com.zebra.rfid.api3.RFIDReader;

import android.util.Log;
import androidx.annotation.Nullable;

import java.util.ArrayList;
import java.util.List; 
import java.util.Optional;

public class RFIDScannerThread extends Thread implements RfidEventsListener, RFIDReaderEventHandler {
  private ReactApplicationContext context;
  private Readers readers;
  private final String TAG = "ReactNative";
  private List<ReaderDevice> devices;

  public RFIDScannerThread(ReactApplicationContext context) {
    this.context = context;
    this.devices = new ArrayList<ReaderDevice>();
  }
  public void connect(final String deviceName, final Promise promise) {
  }

  @Override
 	public void	RFIDReaderDisappeared(ReaderDevice device) {
    this.sendEvent("onDisappeared", device.getName());
  }

  @Override
 	public void RFIDReaderAppeared(ReaderDevice device) {
    this.sendEvent("onAppeared", device.getName());
  }

  private void performInventory() {
    this.getRFIDReader().ifPresent(x -> {
      try {
        x.Actions.Inventory.perform();
      } catch (InvalidUsageException | OperationFailureException e) {
        e.printStackTrace();
      }
    });
  }

  private void stopInventory() {
    this.getRFIDReader().ifPresent(x -> {
      try {
        x.Actions.Inventory.stop();
      } catch (InvalidUsageException | OperationFailureException e) {
        e.printStackTrace();
      }
    });
  }

  private Optional<RFIDReader> getRFIDReader(){
    return this.devices.stream()
      .map(x -> x.getRFIDReader())
      .filter(x -> x.isConnected())
      .findFirst();
  }

  public void eventStatusNotify(RfidStatusEvents event) {
    Log.d(TAG, "Status Notification: " + event.StatusEventData.getStatusEventType());
    if (event.StatusEventData.HandheldTriggerEventData.getHandheldEvent() == HANDHELD_TRIGGER_EVENT_TYPE.HANDHELD_TRIGGER_PRESSED) {
      this.performInventory();
    }

    if (event.StatusEventData.HandheldTriggerEventData.getHandheldEvent() == HANDHELD_TRIGGER_EVENT_TYPE.HANDHELD_TRIGGER_RELEASED) {
      this.stopInventory();
    }
  }

  private void sendEvent(String eventName, @Nullable WritableMap params) {
    this.context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
  }


  private void sendEvent(String eventName, @Nullable WritableArray params) {
    this.context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
  }

  private void sendEvent(String eventName, @Nullable String params) {
    this.context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
  }

  public void eventReadNotify(RfidReadEvents event) {
    this.getRFIDReader().ifPresent(x -> {
      final TagData[] tags = x.Actions.getReadTags(1);
      final WritableArray payload = new WritableNativeArray();
      for (TagData tag : tags) {
        payload.pushString(tag.getTagID());
      }
      this.sendEvent("onRfidRead", payload);
    });
  }
}
