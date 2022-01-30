package com.songfiesta;

import android.graphics.Color;
import android.view.View;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "SongFiesta";
  }

  @Override
  public void setContentView(View view) {
    super.setContentView(view);
    getWindow().getDecorView().setBackgroundColor(Color.BLACK);
  }
}
