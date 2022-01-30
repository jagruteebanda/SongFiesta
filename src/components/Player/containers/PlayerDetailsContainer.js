import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import AudioControls from '../components/AudioControls';
import AudioImageCard from '../components/AudioImageCard';
import HeaderControls from '../components/HeaderControls';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const {width, height} = Dimensions.get('window');

const PlayerDetailsContainer = props => {
  const {route, navigation} = props;
  const {
    audioData,
    audioDetails,
    initialAudioIndex,
    favouritesData,
    setFavouritesData,
  } = route?.params;

  const [audioInfo, setAudioInfo] = useState(audioDetails);
  const [audioIndex, setAudioIndex] = useState(initialAudioIndex || 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seekValue, setSeekValue] = useState(0.0);
  const [audioDuration, setAudioDuration] = useState(0.0);
  const [isMute, setIsMute] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const playAudioTrack = async () => {
    await TrackPlayer.skip(initialAudioIndex);
    await TrackPlayer.play();
  };

  const checkIsFavourite = audioDetails => {
    let isFavourite = favouritesData?.filter?.(a => a.id === audioDetails.id);
    setIsFavourite(isFavourite.length > 0);
  };

  useEffect(() => {
    playAudioTrack();
  }, []);

  useEffect(() => {
    checkIsFavourite(audioInfo);
  }, [favouritesData, audioInfo]);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setAudioInfo(track);
    }
  });

  const handleBackPress = async () => {
    await TrackPlayer.stop();
    navigation?.goBack?.();
  };

  return (
    <View style={styles.container}>
      <HeaderControls handleBackPress={handleBackPress} />
      <AudioImageCard audioInfo={audioInfo} />
      <AudioControls
        audioInfo={audioInfo}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        seekValue={seekValue}
        setSeekValue={setSeekValue}
        audioDuration={audioDuration}
        isMute={isMute}
        setIsMute={setIsMute}
        audioIndex={audioIndex}
        setAudioIndex={setAudioIndex}
        setAudioInfo={setAudioInfo}
        audioData={audioData}
        favouritesData={favouritesData}
        setFavouritesData={setFavouritesData}
        isFavourite={isFavourite}
        setIsFavourite={setIsFavourite}
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

export default PlayerDetailsContainer;
