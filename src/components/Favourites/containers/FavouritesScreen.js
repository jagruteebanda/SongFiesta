import React, {useState, useLayoutEffect, useCallback} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getFavouritesData} from '../utils/favouriteUtil';
import {setupAudioPlayer} from '../../Player/utils/audioPlayerUtil';
import {setHeaderNavigationOptions} from '../../../styles/headerNavigationOptions';
import {Constants} from '../../../common/Constants';
import AudioCard from '../../Home/components/AudioCard';
import EmptyFavouritesView from '../components/EmptyFavouritesView';

const FavouritesScreen = props => {
  const {navigation} = props;
  const [favouritesData, setFavouritesData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const favData = await getFavouritesData();
        setFavouritesData([...favData]);
        setupAudioPlayer(favData);
      };
      getData();
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions(
      setHeaderNavigationOptions(
        navigation,
        Constants.screenTitles.favouritesScreen,
      ),
    );
  }, [navigation]);

  const handleAudioPress = (audioDetails, initialAudioIndex) => {
    navigation.navigate(Constants.screenKeys.playerScreen, {
      audioData: favouritesData,
      audioDetails,
      initialAudioIndex,
      favouritesData,
      setFavouritesData,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {favouritesData?.length > 0 ? (
        favouritesData.map((item, i) => (
          <AudioCard
            key={item.id}
            audioInfo={item}
            handleAudioPress={() => handleAudioPress(item, i)}
            shouldShowFavourite
          />
        ))
      ) : (
        <EmptyFavouritesView navigation={navigation} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
});

export default FavouritesScreen;
