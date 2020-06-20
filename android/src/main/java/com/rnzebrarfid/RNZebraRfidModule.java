package com.rnzebrarfid;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.os.AsyncTask;
import android.util.Log;
import androidx.annotation.Nullable;

import com.zebra.rfid.api3.Antennas;
import com.zebra.rfid.api3.ReaderDevice;
import com.zebra.rfid.api3.RFIDReader;
import com.zebra.rfid.api3.Readers;
import com.zebra.rfid.api3.OperationFailureException;
import com.zebra.rfid.api3.InvalidUsageException;
import com.zebra.rfid.api3.TriggerInfo;
import com.zebra.rfid.api3.TagData;
import com.zebra.rfid.api3.RfidReadEvents;
import com.zebra.rfid.api3.RfidStatusEvents;
import com.zebra.rfid.api3.RfidEventsListener;
import com.zebra.rfid.api3.TagAccess;
import com.zebra.rfid.api3.Readers.RFIDReaderEventHandler;

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

import java.util.ArrayList;
import java.util.List; 
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

import android.widget.Toast;



public class RNZebraRfidModule extends ReactContextBaseJavaModule {
  private final String TAG = "ReactNative";
  private final ReactApplicationContext reactContext;
  private Readers readers;
  private List<ReaderDevice> devices;
  private int MAX_POWER = 270;
  private final RFIDScannerThread scannerThread;

  // test
  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  public RNZebraRfidModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    this.devices = new ArrayList<ReaderDevice>();
    this.scannerThread = new RFIDScannerThread(this.reactContext);
    this.scannerThread.start();
  }

  @Override
  public String getName() {
    return "RNZebraRfid";
  }
  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }

  @ReactMethod
  public void getAvailableDevices(Promise promise) {
    this.scannerThread.getAvailableDevices(promise);
  }

  @ReactMethod
  public void connect(final String deviceName, Promise promise) {
    this.scannerThread.connect(deviceName, promise);
  }
}
