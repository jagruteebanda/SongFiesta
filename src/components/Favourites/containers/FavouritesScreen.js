import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { audioData } from '../../../data/audioData';
const {width, height} = Dimensions.get('window');


const FavouritesScreen = props => {
  const {navigation} = props;

  const setup = async () => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.add(audioData);
  };

  useEffect(() => {
    setPlaylist(audioData);
    setup();
  }, []);

  const handleAudioPress = (audioDetails, initialAudioIndex) => {
    navigation.navigate('PlayerDetailsScreen', {audioData, audioDetails, initialAudioIndex});
  };

  return (
    <ScrollView style={styles.container}>
      {audioData.map((item, i) => (
        <Pressable key={item.id} onPress={() => handleAudioPress(item, i)}>
          <View style={styles.audioCard}>
            <Image style={styles.audioImage} source={{uri: item.artwork}} />
            <View style={styles.audioInfo}>
              <Text style={styles.audioHeading}>{item.title}</Text>
              <Text
                style={
                  styles.audioSubHeading
                }>{`${item.album} - ${item.artist}`}</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  audioCard: {
    flexDirection: 'row',
    marginTop: 8,
    marginHorizontal: 8,
    width: width - 16,
    backgroundColor: '#000000',
    // elevation: 2,
  },
  audioImage: {
    width: 70,
    height: 70,
  },
  audioInfo: {
    paddingLeft: 16,
  },
  audioHeading: {
    color: '#e6e6e6',
    fontSize: 20,
  },
  audioSubHeading: {
    color: '#e6e6e6',
    fontSize: 14,
  },
});

export default FavouritesScreen;
