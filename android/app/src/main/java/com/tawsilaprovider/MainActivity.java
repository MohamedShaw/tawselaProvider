package com.tawsilaprovider;

import com.facebook.react.ReactActivity;
import com.reactnativenavigation.NavigationActivity;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.view.WindowManager;
import android.view.Display;
import android.view.View;
import android.support.v4.content.ContextCompat;
import android.widget.ImageView.ScaleType;
import android.widget.LinearLayout;
import android.graphics.Color;

public class MainActivity extends NavigationActivity {

   
      @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // this.setSplashLayout();


    }

    private void setSplashLayout() {
        LinearLayout linearLayout = new LinearLayout(this);
        
        linearLayout.setBackgroundColor(Color.parseColor("green"));
        ImageView img = new ImageView(this);
        img.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));
        img.setScaleType(ScaleType.FIT_XY);
        
        img.setImageDrawable(getDrawable(R.mipmap.background));
                linearLayout.addView(img);

        setContentView(linearLayout);
    }

  
    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

   
   
}