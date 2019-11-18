package com.example.eznav;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        String test = "tim mcds burgerking";

        ArrayList<String> list = new ArrayList<>();
        String[] alist = (test.split(" "));
        //list.addAll(alist);
        for (int i = 0; i < alist.length - 1; i++) {
            list.add(alist[i]);
        }

        for (String s : list) {
            TextView textView = new TextView(this);
            textView.setText(s);
            parentLinearLayout.addView(textView);
        }

    }

    public void onRemove(View v) {

        parentLinearLayout.removeView((View) v.getParent());


    }

    public void onDone(View v) {


    }


}
