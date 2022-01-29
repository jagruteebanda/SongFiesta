import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  Text,
  ToastAndroid,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const ControlsView = props => {
  const {
    isPlaying = false,
    setIsPlaying = () => {},
    audioInfo = {},
    isMute,
    setIsMute,
    audioIndex,
    setAudioInfo,
    audioData = [],
    setAudioIndex,
  } = props;

  useEffect(() => {
    setIsPlaying(true);
  }, []);

  const handlePlayerVolume = async () => {
    if (isMute) {
      await TrackPlayer.setVolume(5.0);
      setIsMute(false);
    } else {
      await TrackPlayer.setVolume(0);
      setIsMute(true);
    }
  };

  const handlePlayerPauseAndPlay = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  const handleSkipAudio = async skipType => {
    switch (skipType) {
      case 'prev':
        if (audioIndex > 0) {
          setAudioInfo(audioData[audioIndex - 1]);
          setAudioIndex(audioIndex - 1);
          await TrackPlayer.skipToPrevious();
        } else {
          ToastAndroid.show('No previous audio track available', ToastAndroid.SHORT);
        }
        break;
      case 'next':
        if (audioIndex < audioData.length - 1) {
          setAudioInfo(audioData[audioIndex + 1]);
          setAudioIndex(audioIndex + 1);
          await TrackPlayer.skipToNext();
        } else {
          ToastAndroid.show('No next audio track available', ToastAndroid.SHORT);
        }
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.controlsView}>
      <View style={styles.sideIconsView}>
        <MaterialCommunityIcons name="heart" color={'#e6e6e6'} size={25} />
      </View>
      <Pressable onPress={() => handlePlayerVolume()}>
        <View style={[styles.sideIconsView]}>
          <MaterialCommunityIcons
            name={'volume-off'}
            color={isMute ? '#cc0066' : '#e6e6e6'}
            size={25}
          />
        </View>
      </Pressable>
      <Pressable onPress={() => handleSkipAudio('prev')}>
        <View style={styles.middleIconsView}>
          <MaterialCommunityIcons
            name="skip-previous"
            color={'#e6e6e6'}
            size={40}
          />
        </View>
      </Pressable>
      <Pressable onPress={() => handlePlayerPauseAndPlay()}>
        <View style={styles.pausePlayIconView}>
          <MaterialCommunityIcons
            name={isPlaying ? 'pause-circle' : 'play-circle'}
            color={'#e6e6e6'}
            size={70}
          />
        </View>
      </Pressable>
      <Pressable onPress={() => handleSkipAudio('next')}>
        <View style={styles.middleIconsView}>
          <MaterialCommunityIcons
            name="skip-next"
            color={'#e6e6e6'}
            size={40}
          />
        </View>
      </Pressable>
      <View style={styles.sideIconsView}>
        <MaterialCommunityIcons name="download" color={'white'} size={25} />
      </View>
      <View style={styles.sideIconsView}>
        <MaterialCommunityIcons
          name="share-variant"
          color={'#e6e6e6'}
          size={25}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controlsView: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: '#000000',
  },
  sideIconsView: {
    width: 25,
    height: 25,
  },
  middleIconsView: {
    width: 40,
    height: 40,
  },
  pausePlayIconView: {
    width: 70,
    height: 70,
  },
});

export default ControlsView;
