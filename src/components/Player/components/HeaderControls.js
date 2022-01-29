import React from 'react';
import {StyleSheet, View, Dimensions, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import audioUtil from '../../../utils/AudioPlayerUtil';

const {width, height} = Dimensions.get('window');

const HeaderControls = props => {
  const {handleBackPress} = props;

  const backPressHandler = () => {
    audioUtil.releaseAudioPlayer();
    handleBackPress();
  };

  return (
    <View style={styles.headerIconsView}>
      <Pressable onPress={() => backPressHandler()}>
        <View>
          <MaterialCommunityIcons
            name="chevron-left"
            color={'#e6e6e6'}
            size={40}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerIconsView: {
    height: 40,
    backgroundColor: '#000000',
  },
});

export default HeaderControls;
