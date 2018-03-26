package com.anxintao;

import android.app.Application;

import com.facebook.react.ReactApplication;
import cn.reactnative.modules.update.UpdatePackage;
import com.theweflex.react.WeChatPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.theweflex.react.WeChatPackage;
import com.umeng.commonsdk.UMConfigure;

import cn.jpush.reactnativejpush.JPushPackage;   // <--   导入 JPushPackage

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    
    // 设置为 true 将不会弹出 toast
    private boolean SHUTDOWN_TOAST = false;
    // 设置为 true 将不会打印 log
    private boolean SHUTDOWN_LOG = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new UpdatePackage(),
            new WeChatPackage(),
            new FastImageViewPackage(),
            new WeChatPackage(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG)   //  <-- 添加 JPushPackage
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
    UMConfigure.init(this, UMConfigure.DEVICE_TYPE_PHONE, "1fe6a20054bcef865eeb0991ee84525b");
    
  }
}
