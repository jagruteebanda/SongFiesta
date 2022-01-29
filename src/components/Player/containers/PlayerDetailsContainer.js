import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import audioUtil from '../../../utils/AudioPlayerUtil';
import AudioControls from '../components/AudioControls';
import AudioImageCard from '../components/AudioImageCard';
import HeaderControls from '../components/HeaderControls';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';
const {width, height} = Dimensions.get('window');

const PlayerDetailsContainer = props => {
  const {route} = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [seekValue, setSeekValue] = useState(0.0);
  const [audioDuration, setAudioDuration] = useState(0.0);
  const {audioInfo} = route?.params;

  useEffect(() => {
    audioUtil.getAudioDuration(audioInfo?.url, audioDuration => {
      setAudioDuration(audioDuration);
    });
  }, []);

  // useTrackPlayerEvents((events, event) => {
  //   if (event.type === Event.PlaybackError) {
  //     console.warn('An error occurred while playing the current track.');
  //   }
  //   if (event.type === Event.PlaybackState) {
  //     console.log(event.type);
  //   }
  //   if (event.type === Event.RemotePlay) {
  //     console.log(event.type);
  //   }
  //   if (event.type === Event.RemotePause) {
  //     console.log(event.type);
  //   }
  // });

  return (
    <View style={styles.container}>
      <HeaderControls />
      <AudioImageCard audioInfo={audioInfo} />
      <AudioControls
        audioInfo={audioInfo}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        seekValue={seekValue}
        setSeekValue={setSeekValue}
        audioDuration={audioDuration}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

PlayerDetailsContainer.navigationOptions = () => ({
  headerShown: false,
});

export default PlayerDetailsContainer;
