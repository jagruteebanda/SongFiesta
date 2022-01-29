package com.audioplayer;

import android.media.AudioAttributes;
import android.media.AudioManager;
import android.media.MediaMetadataRetriever;
import android.media.MediaPlayer;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
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

    public static String formatMilliSeconds(long milliseconds) {
        String finalTimerString = "";
        String secondsString = "";

        // Convert total duration into time
        int hours = (int) (milliseconds / (1000 * 60 * 60));
        int minutes = (int) (milliseconds % (1000 * 60 * 60)) / (1000 * 60);
        int seconds = (int) ((milliseconds % (1000 * 60 * 60)) % (1000 * 60) / 1000);

        // Add hours if there
        if (hours > 0) {
            finalTimerString = hours + ":";
        }

        if (seconds < 10) {
            secondsString = "0" + seconds;
        } else {
            secondsString = "" + seconds;
        }

        finalTimerString = finalTimerString + minutes + ":" + secondsString;
        return finalTimerString;
    }

    @ReactMethod
    public void getAudioDuration(String audioFileUrl, Callback cb) {
        if (mediaPlayer != null) {
            cb.invoke(formatMilliSeconds(mediaPlayer.getDuration()));
        } else {
            MediaMetadataRetriever mediaMetadataRetriever = new MediaMetadataRetriever();
            mediaMetadataRetriever.setDataSource(audioFileUrl);
            String durationStr = mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DURATION);
            cb.invoke(formatMilliSeconds(Long.parseLong(durationStr)));
        }
    }

    @ReactMethod
    public void startAudio(String audioFileUrl) {
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
    public void pauseAndPlayAudio() {
        int mediaLength = mediaPlayer.getCurrentPosition();
        if (mediaPlayer != null && mediaPlayer.isPlaying()) {
            mediaPlayer.pause();
        } else {
            mediaPlayer.seekTo(mediaLength);
            mediaPlayer.start();
        }
    }

    @ReactMethod
    public void getSeekingAudioDuration() {
        if (mediaPlayer != null && mediaPlayer.isPlaying()) {
            mediaPlayer.getCurrentPosition();
        } else {
            Toast.makeText(reactApplicationContext, "Audio not playing", Toast.LENGTH_SHORT).show();
        }
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
