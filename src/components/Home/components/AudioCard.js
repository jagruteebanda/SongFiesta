import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Constants } from '../../../common/Constants';

const {width} = Dimensions.get('window');

const AudioCard = props => {
  const {handleAudioPress, audioInfo, shouldShowFavourite = false} = props;

  return (
    <Pressable onPress={handleAudioPress}>
      <View style={styles.audioCard}>
        <Image style={styles.audioImage} source={{uri: audioInfo?.artwork}} />
        <View style={styles.audioInfo}>
          <View>
            <Text style={styles.audioHeading}>{audioInfo?.title || ''}</Text>
            <Text
              style={
                styles.audioSubHeading
              }>{`${audioInfo?.album} - ${audioInfo?.artist}`}</Text>
          </View>
          {shouldShowFavourite && (
            <View style={styles.favIconStyle}>
              <MaterialCommunityIcons
                name={Constants.iconNames.heart}
                color={Constants.colourCodes.pink}
                size={20}
              />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
  favIconStyle: {
    paddingTop: 8,
  },
});

export default AudioCard;
