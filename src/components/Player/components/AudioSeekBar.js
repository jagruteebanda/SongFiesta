import React from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {useEffect} from 'react/cjs/react.development';

const {width, height} = Dimensions.get('window');

const AudioSeekBar = props => {
  const {audioInfo = {}, seekValue, setSeekValue} = props;

  const progress = useProgress();

  const secondsToMinutes = seconds => {
    return Math.floor(seconds / 60);
  };

  const secsToTimestamp = seconds => {
    const mins = secondsToMinutes(seconds);
    const secs = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
    return `${mins}:${secs}`;
  };

  const handleSeekBarChange = async value => {
    await TrackPlayer.seekTo(value);
  };

  return (
    <View style={styles.seekBarView}>
      <Slider
        style={{width: width - 8, height: 25}}
        step={1}
        onSlidingComplete={v => handleSeekBarChange(v)}
        value={seekValue}
        minimumValue={0}
        maximumValue={progress.duration}
        thumbTintColor={'#cc0066'}
        minimumTrackTintColor={'#cc0066'}
        maximumTrackTintColor={'#e6e6e6'}
      />
      <View
        style={{
          flexDirection: 'row',
          width,
          paddingHorizontal: 16,
          justifyContent: 'space-between',
          height: 25,
        }}>
        <Text style={{color: '#cc0066'}}>
          {secsToTimestamp(Math.floor(progress.position))}
        </Text>
        <Text style={{color: '#e6e6e6'}}>
          {secsToTimestamp(audioInfo.duration)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  seekBarView: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#000000',
  },
});

export default AudioSeekBar;
