import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Text,
  Pressable,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import {audioData} from '../../../data/audioData';
import TrackPlayer from 'react-native-track-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const HomeScreen = props => {
  const {navigation} = props;
  const [favouritesData, setFavouritesData] = useState([]);

  const setup = async () => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.add(audioData);
  };

  const getFavouritesData = async () => {
    try {
      const value = await AsyncStorage.getItem('audio_track_favourites');
      if (value !== null) {
        setFavouritesData(JSON.parse(value) || []);
      }
    } catch (e) {
      ToastAndroid.show('Error in Asyncstorage', ToastAndroid.SHORT);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setup();
      getFavouritesData();
    }, []),
  );

  const handleAudioPress = (audioDetails, initialAudioIndex) => {
    navigation.navigate('PlayerDetailsScreen', {
      audioData,
      audioDetails,
      initialAudioIndex,
      favouritesData,
      setFavouritesData,
    });
  };

  const handleMenuPress = () => {
    navigation?.openDrawer?.();
  };

  return (
    <>
      <View
        style={{
          height: 60,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#000000',
          borderBottomWidth: 1,
          borderColor: '#262626',
          flexDirection: 'row',
          paddingHorizontal: 16,
        }}>
        <Pressable onPress={() => handleMenuPress()}>
          <MaterialCommunityIcons name="menu" color={'#99004d'} size={24} />
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
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
        <MaterialCommunityIcons name="menu" color={'#000000'} size={24} />
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
