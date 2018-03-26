package com.anxintao;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.facebook.drawee.view.SimpleDraweeView;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class LoadActivity extends AppCompatActivity {

    ProgressBar progressBar;
    TextView tv_update;
    ImageView iv_arrow;
    Uri uri;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_load);

        //设置组件对象
        progressBar = (ProgressBar) findViewById(R.id.progressBar);
        tv_update = (TextView) findViewById(R.id.tv_update);
        iv_arrow = (ImageView) findViewById(R.id.iv_arrow);
        //进入下载节奏
        DownBundle();
    }
    //启动app的主界面
    private  void  startApp(){
        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent = new Intent(LoadActivity.this, MainActivity.class);
                if (null != uri) {
                    intent.setData(uri);
                    intent.setAction(Intent.ACTION_VIEW);
                }
                startActivity(intent);
                finish();
            }
        }, 500);
    }
    //获取文件的md5
    private String getBundleMD5() {
        String jsBundleFile = getFilesDir().getAbsolutePath() + "/index.android.bundle";
        File file = new File(jsBundleFile);
        return file != null && file.exists() ? MD5Util.md5sum(jsBundleFile) :"";
    }

    //下载文件,如果出错就启动
    private void DownBundle(){
        String token=getBundleMD5();
        Request req=new Request.Builder().addHeader("token",token).url("http://www.guofangchao.com/down").build();
        new OkHttpClient().newCall(req).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                //下载失败直接启动app
                startApp();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                tv_update.setVisibility(View.VISIBLE);
                progressBar.setVisibility(View.VISIBLE);
                iv_arrow.setVisibility(View.VISIBLE);
                progressBar.setProgress(0);

                //下载成功
                InputStream is = null;
                byte[] buf = new byte[2048];
                int len = 0;
                FileOutputStream fos = null;
                // 储存下载文件的目录
                File file = new File(getFilesDir().getAbsolutePath()+"/index.android.bundle");
               try{
                   is = response.body().byteStream();
                   long total = response.body().contentLength();
                   fos = new FileOutputStream(file);
                   long sum = 0;
                   while ((len = is.read(buf)) != -1) {
                       fos.write(buf, 0, len);
                       sum += len;
                       int progress = (int) (sum * 1.0f / total * 100);
                       // 下载中更新进度条
                       progressBar.setProgress(progress);
                   }
                   fos.flush();
               }catch (Exception e){
                   startApp();
               }finally {
                   try {
                       if (is != null)
                           is.close();
                   } catch (IOException e) {
                   }
                   try {
                       if (fos != null)
                           fos.close();
                   } catch (IOException e) {
                   }
                   startApp();
               }
            }
        });
    }

}
