import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const FavouritesScreen = props => {
  const {navigation} = props;
  const [favouritesData, setFavouritesData] = useState([]);

  const getFavouritesData = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('audio_track_favourites');
      if (value !== null) {
        let audioData = JSON.parse(value);
        setFavouritesData(audioData || []);
        setup(audioData);
      }
    } catch (e) {
      ToastAndroid.show('Error in Asyncstorage', ToastAndroid.SHORT);
    }
  });

  useFocusEffect(
    useCallback(() => {
      getFavouritesData();
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation?.openDrawer?.()}>
          <View style={{marginLeft: 16}}>
            <MaterialCommunityIcons name="menu" color={'#99004d'} size={24} />
          </View>
        </Pressable>
      ),
      headerTitle: 'Favourites',
      headerStyle: {
        backgroundColor: '#000000',
        height: 60,
      },
      headerTitleStyle: {
        fontFamily: 'KleeOne-Regular',
        color: '#cc0066',
      },
    });
  }, [navigation]);

  const setup = async audioData => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.add(audioData);
  };

  const handleAudioPress = (audioDetails, initialAudioIndex) => {
    navigation.navigate('PlayerDetailsScreen', {
      audioData: favouritesData,
      audioDetails,
      initialAudioIndex,
      favouritesData,
      setFavouritesData,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {favouritesData.map((item, i) => (
        <Pressable key={item.id} onPress={() => handleAudioPress(item, i)}>
          <View style={styles.audioCard}>
            <Image style={styles.audioImage} source={{uri: item.artwork}} />
            <View style={styles.audioInfo}>
              <View>
                <Text style={styles.audioHeading}>{item.title}</Text>
                <Text
                  style={
                    styles.audioSubHeading
                  }>{`${item.album} - ${item.artist}`}</Text>
              </View>
              <View style={{paddingTop: 8}}>
                <MaterialCommunityIcons
                  name="heart"
                  color={'#cc0066'}
                  size={20}
                />
              </View>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

FavouritesScreen.screenOptions = () => {
  return {
    headerLeft: () => (
      <Pressable onPress={() => navigation?.openDrawer?.()}>
        <View style={{marginLeft: 16}}>
          <MaterialCommunityIcons name="menu" color={'#99004d'} size={24} />
        </View>
      </Pressable>
    ),
    headerTitle: 'Favourites',
    headerStyle: {
      backgroundColor: '#000000',
      height: 60,
    },
    headerTitleStyle: {
      fontFamily: 'KleeOne-Regular',
      color: '#cc0066',
    },
  };
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
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
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

export default FavouritesScreen;
