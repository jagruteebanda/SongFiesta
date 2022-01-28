import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import AudioControls from '../components/AudioControls';
import AudioImageCard from '../components/AudioImageCard';
import HeaderControls from '../components/HeaderControls';

const {width, height} = Dimensions.get('window');

const PlayerDetailsContainer = props => {
	const {
		audioDetails
	} = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [seekValue, setSeekValue] = useState(0.0);

  return (
    <View style={styles.container}>
      <HeaderControls />
      <AudioImageCard />
      <AudioControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        seekValue={seekValue}
        setSeekValue={setSeekValue}
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
