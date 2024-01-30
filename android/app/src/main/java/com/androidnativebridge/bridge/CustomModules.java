package com.androidnativebridge.bridge;

import android.content.Intent;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CustomModules extends ReactContextBaseJavaModule {

    public CustomModules(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "CustomModules";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void navigateToHome() {
        Intent i = new Intent(getCurrentActivity(), HomeActivity.class);
        getCurrentActivity().startActivity(i);
    }

}
