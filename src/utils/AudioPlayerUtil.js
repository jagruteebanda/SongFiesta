import { NativeModules } from 'react-native';

const { AudioPlayerModule } = NativeModules;

const audioUtil = {
  playAudio(url = '') {
    AudioPlayerModule?.playAudio?.(url);
  },

	stopAudio() {
		AudioPlayerModule?.stopAudio?.();
	},

	releaseAudioPlayer() {
		AudioPlayerModule?.releaseAudioPlayer?.();
	},

	muteAudio() {
		AudioPlayerModule?.muteAudio?.();
	}
};

export default audioUtil;
