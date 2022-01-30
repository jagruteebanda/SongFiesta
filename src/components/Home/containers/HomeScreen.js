import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Text,
  Pressable,
} from 'react-native';
import {audioData} from '../../../data/audioData';
import TrackPlayer from 'react-native-track-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const HomeScreen = props => {
  const {navigation} = props;
  const [playlist, setPlaylist] = useState([]);

  const setup = async () => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.add(audioData);
  };

  useEffect(() => {
    setPlaylist(audioData);
    setup();
  }, []);

  const handleAudioPress = (audioDetails, initialAudioIndex) => {
    navigation.navigate('PlayerDetailsScreen', {
      audioData,
      audioDetails,
      initialAudioIndex,
    });
  };

  return (
    <>
      <View
        style={{
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          borderBottomWidth: 1,
          borderColor: '#262626',
          flexDirection: 'row',
        }}>
        <MaterialCommunityIcons
          name="music-note-sixteenth-dotted"
          color={'#99004d'}
          size={30}
        />
        <Text
          style={{
            fontSize: 30,
            color: '#cc0066',
            fontFamily: 'Quintessential-Regular',
            marginLeft: 8,
          }}>
          {'SongFiesta'}
        </Text>
      </View>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  audioCard: {
    flexDirection: 'row',
    paddingVertical: 8,
    marginHorizontal: 8,
    width: width - 16,
    backgroundColor: '#000000',
    elevation: 2,
    // paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: '#1a1a1a',
  },
  audioImage: {
    width: 70,
    height: 70,
    borderRadius: 2,
  },
  audioInfo: {
    paddingLeft: 16,
  },
  audioHeading: {
    marginTop: 4,
    color: '#cc0066',
    fontSize: 18,
    fontFamily: 'KleeOne-SemiBold',
  },
  audioSubHeading: {
    marginTop: 4,
    color: '#e6e6e6',
    fontSize: 14,
    fontFamily: 'KleeOne-Regular',
  },
});

export default HomeScreen;
