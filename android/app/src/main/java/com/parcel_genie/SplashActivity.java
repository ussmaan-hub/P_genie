package com.parcel_genie;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;

import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    final int MIN_TIME_INTERVAL_FOR_SPLASH = 2500; // in millis
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.launch_screen);

    }
    @Override
    public void onResume() {
        super.onResume();
        launchTimerAndTask();
    }
    private void launchTimerAndTask() {
        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {
                showMainActivity();
            }
        }, MIN_TIME_INTERVAL_FOR_SPLASH);

    }
    private void showMainActivity() {
        Intent i = new Intent(this, MainActivity.class);
        startActivity(i);
        finish();
    }
}
