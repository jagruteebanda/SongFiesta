import React from 'react';
import {StyleSheet, View, Dimensions, Pressable} from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import audioUtil from '../../../utils/AudioPlayerUtil';

const {width, height} = Dimensions.get('window');

const AudioControls = props => {
  const {isPlaying, setIsPlaying, seekValue, setSeekValue} = props;

  return (
    <View style={styles.controlsContainer}>
      <View style={styles.audioInfoView}></View>
      <View style={styles.seekBarView}>
        <Slider
          style={{width}}
          step={0.01}
          onValueChange={value => setSeekValue(value)}
          value={seekValue}
          minimumValue={0.0}
          maximumValue={10.0}
          thumbTintColor={'#e6e6e6'}
          minimumTrackTintColor={'#e6e6e6'}
          maximumTrackTintColor={'#ff0000'}
        />
      </View>
      <View style={styles.controlsView}>
        <View style={styles.sideIconsView}>
          <MaterialCommunityIcons name="heart" color={'white'} size={30} />
        </View>
        <Pressable onPress={() => {}}>
          <View style={[styles.sideIconsView]}>
            <MaterialCommunityIcons
              name="volume-off"
              color={'white'}
              size={30}
            />
          </View>
        </Pressable>
        <View style={styles.middleIconsView}>
          <MaterialCommunityIcons
            name="skip-previous-circle"
            color={'white'}
            size={40}
          />
        </View>
        <Pressable
          onPress={() => {
            if (isPlaying) {
              audioUtil.stopAudio();
            } else {
              audioUtil.playAudio(
                'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
              );
              setIsPlaying(p => !p);
            }
          }}>
          <View style={styles.pausePlayIconView}>
            <MaterialCommunityIcons
              name={isPlaying ? 'pause-circle' : 'play-circle'}
              color={'white'}
              size={60}
            />
          </View>
        </Pressable>
        <View style={styles.middleIconsView}>
          <MaterialCommunityIcons
            name="skip-next-circle"
            color={'white'}
            size={40}
          />
        </View>
        <View style={styles.sideIconsView}>
          <MaterialCommunityIcons name="download" color={'white'} size={30} />
        </View>
        <View style={styles.sideIconsView}>
          <MaterialCommunityIcons
            name="share-variant"
            color={'white'}
            size={30}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {},
  audioInfoView: {
    height: 50,
    backgroundColor: '#404040',
  },
  seekBarView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#262626',
  },
  controlsView: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: '#000000',
  },
  sideIconsView: {
    width: 30,
    height: 30,
  },
  middleIconsView: {
    width: 40,
    height: 40,
  },
  pausePlayIconView: {
    width: 60,
    height: 60,
  },
});

export default AudioControls;
