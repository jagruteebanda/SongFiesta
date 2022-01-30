import TrackPlayer from 'react-native-track-player';

export const setupAudioPlayer = async playlist => {
  await TrackPlayer.setupPlayer({});
  await TrackPlayer.add(playlist);
};
