package com.bileklikapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.tradle.react.UdpSocketsModule;
import org.reactnative.camera.RNCameraPackage;
import com.peel.react.TcpSocketsModule;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.rusel.RCTBluetoothSerial.RCTBluetoothSerialPackage;
import com.jamesisaac.rnbackgroundtask.BackgroundTaskPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.remobile.toast.RCTToastPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new UdpSocketsModule(),
            new RNCameraPackage(),
            new TcpSocketsModule(),
            new ReactNativePushNotificationPackage(),//this
            new RCTBluetoothSerialPackage(),//this
            new BackgroundTaskPackage(),//this
            new RCTToastPackage()//this
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    BackgroundTaskPackage.useContext(this);
  }
}
