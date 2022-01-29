import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions, Pressable, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import audioUtil from '../../../utils/AudioPlayerUtil';

const {width, height} = Dimensions.get('window');

const ControlsView = props => {
  const {isPlaying = false, setIsPlaying = () => {}} = props;

  useEffect(() => {
    audioUtil.startAudio(
      'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
    );
    setIsPlaying(true);
  }, []);

  return (
    <View style={styles.controlsView}>
      <View style={styles.sideIconsView}>
        <MaterialCommunityIcons name="heart" color={'#e6e6e6'} size={25} />
      </View>
      <Pressable onPress={() => {}}>
        <View style={[styles.sideIconsView]}>
          <MaterialCommunityIcons
            name="volume-off"
            color={'#e6e6e6'}
            size={25}
          />
        </View>
      </Pressable>
      <View style={styles.middleIconsView}>
        <MaterialCommunityIcons
          name="skip-previous"
          color={'#e6e6e6'}
          size={40}
        />
      </View>
      <Pressable
        onPress={() => {
          audioUtil.pauseAndPlayAudio();
          setIsPlaying(p => !p);
        }}>
        <View style={styles.pausePlayIconView}>
          <MaterialCommunityIcons
            name={isPlaying ? 'pause-circle' : 'play-circle'}
            color={'#e6e6e6'}
            size={70}
          />
        </View>
      </Pressable>
      <View style={styles.middleIconsView}>
        <MaterialCommunityIcons name="skip-next" color={'#e6e6e6'} size={40} />
      </View>
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
