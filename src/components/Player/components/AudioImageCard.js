import React from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';

const {width, height} = Dimensions.get('window');

const AudioImageCard = props => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: 'https://e.snmc.io/i/600/s/fab107633af3df9a5ea77742639594d6/7601802/vishal-shekhar-befikre-Cover-Art.png',
        }}
        style={{width: width - 16, height: width, borderRadius: 4}}
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
