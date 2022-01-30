import React, {useEffect} from 'react';
import {StyleSheet, View, Pressable, ToastAndroid, Share} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ControlsView = props => {
  const {
    isPlaying = false,
    setIsPlaying = () => {},
    audioInfo = {},
    setAudioInfo,
    isMute,
    setIsMute,
    audioIndex,
    setAudioIndex,
    audioData = [],
    favouritesData = [],
    setFavouritesData,
    isFavourite,
    setIsFavourite,
  } = props;

  useEffect(() => {
    setIsPlaying(true);
  }, []);

  const setFavouritesDataInAsync = async favouritesData => {
    try {
      await AsyncStorage.setItem(
        'audio_track_favourites',
        JSON.stringify(favouritesData),
      );
    } catch (error) {
      ToastAndroid.show('Error in setting AsyncStorage', ToastAndroid.SHORT);
    }
  };

  const handleFavouritePress = () => {
    let favData = favouritesData || [];
    if (isFavourite) {
      favData = favData?.filter(f => f.id !== audioInfo.id);
      ToastAndroid.show('Removed from favourites', ToastAndroid.SHORT);
    } else {
      let arr = favData?.filter(f => f.id === audioInfo.id);
      arr?.length === 0 && favData.push(audioInfo);
      ToastAndroid.show('Added to favourites', ToastAndroid.SHORT);
    }
    setFavouritesDataInAsync(favData);
    setFavouritesData([...favData]);
    setIsFavourite(f => !f);
  };

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
          ToastAndroid.show(
            'No previous audio track available',
            ToastAndroid.SHORT,
          );
        }
        break;
      case 'next':
        if (audioIndex < audioData.length - 1) {
          setAudioInfo(audioData[audioIndex + 1]);
          setAudioIndex(audioIndex + 1);
          await TrackPlayer.skipToNext();
        } else {
          ToastAndroid.show(
            'No next audio track available',
            ToastAndroid.SHORT,
          );
        }
        break;
      default:
        break;
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Download SongFiesta to listen and download cool music\nListen to ${audioInfo.title} by ${audioInfo.artist} on SongFiesta\n${audioInfo.url}`,
        url: audioInfo.url,
        title: 'Download SongFiesta to listen and download cool music',
      });
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.controlsView}>
      <Pressable onPress={() => handleFavouritePress()}>
        <View style={styles.sideIconsView}>
          <MaterialCommunityIcons
            name="heart"
            color={isFavourite ? '#cc0066' : '#e6e6e6'}
            size={25}
          />
        </View>
      </Pressable>
      <View style={[styles.sideIconsView, {opacity: 0}]}>
        <MaterialCommunityIcons
          name={'volume-off'}
          color={isMute ? '#cc0066' : '#e6e6e6'}
          size={25}
        />
      </View>
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
      <View style={[styles.sideIconsView, {opacity: 0}]}>
        <MaterialCommunityIcons name="download" color={'white'} size={25} />
      </View>
      <Pressable onPress={() => onShare()}>
        <View style={styles.sideIconsView}>
          <MaterialCommunityIcons
            name="share-variant"
            color={'#e6e6e6'}
            size={25}
          />
        </View>
      </Pressable>
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
