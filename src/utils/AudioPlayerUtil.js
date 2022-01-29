import {NativeModules} from 'react-native';

const {AudioPlayerModule} = NativeModules;

const audioUtil = {
  getAudioDuration(audioUrl = '', cb) {
    AudioPlayerModule?.getAudioDuration?.(audioUrl, audioDuration => cb(audioDuration));
  },

  startAudio(url = '') {
    AudioPlayerModule?.startAudio?.(url);
  },

  pauseAndPlayAudio() {
    AudioPlayerModule?.pauseAndPlayAudio?.();
  },

  stopAudio() {
    AudioPlayerModule?.stopAudio?.();
  },

  releaseAudioPlayer() {
    AudioPlayerModule?.releaseAudioPlayer?.();
  },

  muteAudio() {
    AudioPlayerModule?.muteAudio?.();
  },
};

export default audioUtil;
