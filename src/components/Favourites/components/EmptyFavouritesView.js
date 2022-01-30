import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {Constants} from '../../../common/Constants';

const {width, height} = Dimensions.get('window');

const EmptyFavouritesView = props => {
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation?.navigate?.(Constants.screenKeys.homeScreen)}>
        <View style={styles.exploreButtonView}>
          <Text style={styles.exploreButtonText}>
            {Constants.strings.exploreSongs}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height: height - 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreButtonView: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderColor: '#cc0066',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreButtonText: {
    color: '#cc0066',
    fontFamily: 'KleeOne-SemiBold',
    fontSize: 18,
  },
});

export default EmptyFavouritesView;
