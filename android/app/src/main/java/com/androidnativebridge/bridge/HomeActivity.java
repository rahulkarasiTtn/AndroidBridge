package com.androidnativebridge.bridge;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.androidnativebridge.R;
import com.facebook.react.ReactApplication;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Objects;

public class HomeActivity extends AppCompatActivity {

    Button submit;
    EditText commentEditText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        submit = findViewById(R.id.submitButton);
        commentEditText = findViewById(R.id.comment);

        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                String comment = commentEditText.getText().toString();
                if (comment.length() > 0) {
                    try {
                        Objects.requireNonNull(((ReactApplication) getApplicationContext()).getReactNativeHost().getReactInstanceManager().getCurrentReactContext())
                                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("goToResult", comment);
                        finish();
                    } catch (Exception e) {
                        System.out.println(e);
                    }
                } else {
                    Toast.makeText(getApplicationContext(), "Please add comment", Toast.LENGTH_LONG).show();
                }
            }
        });
    }
}