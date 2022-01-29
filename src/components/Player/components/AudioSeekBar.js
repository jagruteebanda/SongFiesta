import React from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import Slider from '@react-native-community/slider';

const {width, height} = Dimensions.get('window');

const AudioSeekBar = props => {
  const {
    audioInfo = {},
    seekValue = 0.0,
    setSeekValue,
    audioDuration = 0.0,
  } = props;

  const formatAudioDuration = time => {
    return `${time.toFixed(2)}`;
  };

  return (
    <View style={styles.seekBarView}>
      <Slider
        style={{width: width - 8, height: 25}}
        step={0.01}
        onValueChange={value => setSeekValue(value)}
        value={seekValue}
        minimumValue={0.0}
        maximumValue={10.0}
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
        <Text style={{color: '#cc0066'}}>{formatAudioDuration(seekValue)}</Text>
        <Text style={{color: '#e6e6e6'}}>
          {audioDuration}
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
