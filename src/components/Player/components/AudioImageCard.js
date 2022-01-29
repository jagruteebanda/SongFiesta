import React from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';

const {width, height} = Dimensions.get('window');

const AudioImageCard = props => {
  const {audioInfo} = props;

  return (
    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: audioInfo?.artwork,
        }}
        style={{width: width - 16, height: width - 16, borderRadius: 4}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AudioImageCard;
