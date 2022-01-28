import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const HeaderControls = props => {
  return <View style={styles.headerIconsView}></View>;
};

const styles = StyleSheet.create({
  headerIconsView: {
    height: 40,
    backgroundColor: '#000000',
  },
});

export default HeaderControls;
