import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Constants} from '../../../common/Constants';

const HeaderControls = props => {
  const {handleBackPress} = props;

  const backPressHandler = () => {
    handleBackPress();
  };

  return (
    <View style={styles.headerIconsView}>
      <Pressable onPress={() => backPressHandler()}>
        <View>
          <MaterialCommunityIcons
            name={Constants.iconNames.back}
            color={Constants.colourCodes.grey}
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
    backgroundColor: Constants.colourCodes.black,
  },
});

export default HeaderControls;
