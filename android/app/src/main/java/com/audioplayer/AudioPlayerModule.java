package com.audioplayer;

import android.media.AudioAttributes;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.toast.ToastModule;
import com.songfiesta.MainActivity;

import java.io.IOException;

public class AudioPlayerModule extends ReactContextBaseJavaModule {
    String TAG = getName();
    ReactApplicationContext reactApplicationContext;
    MediaPlayer mediaPlayer;

    public AudioPlayerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactApplicationContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "AudioPlayerModule";
    }

    @ReactMethod
    public void playAudio(String audioFileUrl) {
        mediaPlayer = new MediaPlayer();
        mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
        try {
            mediaPlayer.setDataSource(audioFileUrl);
            mediaPlayer.prepare();
            mediaPlayer.start();
        } catch (IOException e) {
            Toast.makeText(reactApplicationContext, "Audio play error", Toast.LENGTH_SHORT).show();
        }
        Toast.makeText(reactApplicationContext, "Audio started playing..", Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void stopAudio() {
        if (mediaPlayer != null && mediaPlayer.isPlaying()) {
            mediaPlayer.stop();
        } else {
            Toast.makeText(reactApplicationContext, "Audio not playing", Toast.LENGTH_SHORT).show();
        }
    }

    @ReactMethod
    public void muteAudio() {
        AudioManager audioManager = (AudioManager) reactApplicationContext.getSystemService(reactApplicationContext.AUDIO_SERVICE);
        audioManager.setRingerMode(AudioManager.RINGER_MODE_SILENT);
    }

    @ReactMethod
    public void releaseAudioPlayer() {
        if (mediaPlayer != null) {
            mediaPlayer.release();
            mediaPlayer = null;
        }
    }
}
