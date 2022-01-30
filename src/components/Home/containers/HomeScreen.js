import React, {useCallback, useState} from 'react';
import {StyleSheet, ScrollView, Dimensions} from 'react-native';
import {audioData} from '../../../data/audioData';
import {useFocusEffect} from '@react-navigation/native';
import {setupAudioPlayer} from '../../Player/utils/audioPlayerUtil';
import {Constants} from '../../../common/Constants';
import AppHeader from '../components/AppHeader';
import AudioCard from '../components/AudioCard';
import {getFavouritesData} from '../../Favourites/utils/favouriteUtil';

const {width} = Dimensions.get('window');

const HomeScreen = props => {
  const {navigation} = props;
  const [favouritesData, setFavouritesData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        setupAudioPlayer(audioData);
        const favData = await getFavouritesData();
        setFavouritesData([...favData]);
      };
      getData();
    }, []),
  );

  const handleAudioPress = (audioDetails, initialAudioIndex) => {
    navigation.navigate(Constants.screenKeys.playerScreen, {
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
      <AppHeader handleMenuPress={handleMenuPress} />
      <ScrollView style={styles.container}>
        {audioData.map((item, i) => (
          <AudioCard
            key={item.id}
            audioInfo={item}
            handleAudioPress={() => handleAudioPress(item, i)}
          />
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
});

export default HomeScreen;
