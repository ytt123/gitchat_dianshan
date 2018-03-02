package com.anxintao;

import android.app.Activity;
import android.os.Bundle;

import com.facebook.react.ReactActivityDelegate;

import javax.annotation.Nullable;


public class RNActivityDelegate extends ReactActivityDelegate {

    public RNActivityDelegate(Activity activity, @Nullable String mainComponentName) {
       super(activity,mainComponentName);
    }

    @Override
    protected @Nullable Bundle getLaunchOptions() {
        Bundle bundle=new Bundle();
        bundle.putString("key1","test_value_android");
        return bundle;
    }
}
