import React from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import ControlsView from './ControlsView';
import AudioSeekBar from './AudioSeekBar';
import {audioData} from '../../../data/audioData';

const {width, height} = Dimensions.get('window');

const AudioControls = props => {
  const {
    audioInfo = {},
    isPlaying = false,
    setIsPlaying = () => {},
    seekValue = 0.0,
    setSeekValue,
    audioDuration = 0.0,
    isMute,
    setIsMute,
    audioIndex,
    setAudioInfo,
    audioData,
    setAudioIndex
  } = props;

  const formatAudioDuration = time => {
    return `${time.toFixed(2)}`;
  };

  return (
    <View style={styles.controlsContainer}>
      <View style={styles.audioInfoView}>
        <Text style={{color: '#ffffff', fontSize: 20, fontFamily: 'KleeOne-SemiBold'}}>{audioInfo.title}</Text>
        <Text
          style={{
            color: '#cc0066',
            fontFamily: 'KleeOne-Regular'
          }}>{`${audioInfo.album} - ${audioInfo.artist}`}</Text>
      </View>
      <AudioSeekBar
        audioInfo={audioInfo}
        seekValue={seekValue}
        setSeekValue={setSeekValue}
        audioDuration={audioDuration}
      />
      <ControlsView
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioInfo={audioInfo}
        isMute={isMute}
        setIsMute={setIsMute}
        audioIndex={audioIndex}
        setAudioInfo={setAudioInfo}
        audioData={audioData}
        setAudioIndex={setAudioIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {},
  audioInfoView: {
    height: 60,
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  seekBarView: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#000000',
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

export default AudioControls;
