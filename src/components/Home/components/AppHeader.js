import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Constants} from '../../../common/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AppHeader = props => {
  const {handleMenuPress} = props;

  return (
    <View style={styles.container}>
      <Pressable onPress={handleMenuPress}>
        <MaterialCommunityIcons
          name={Constants.iconNames.menu}
          color={Constants.colourCodes.pink}
          size={24}
        />
      </Pressable>
      <View style={styles.appTitleView}>
        <MaterialCommunityIcons
          name={Constants.iconNames.appIcon}
          color={Constants.colourCodes.darkPink}
          size={30}
        />
        <Text style={styles.appTitleStyle}>
          {Constants.screenTitles.appName}
        </Text>
      </View>
      <MaterialCommunityIcons
        name={Constants.iconNames.menu}
        color={Constants.colourCodes.black}
        size={24}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderColor: '#262626',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  appTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitleStyle: {
    fontSize: 30,
    color: '#cc0066',
    fontFamily: 'Quintessential-Regular',
    marginLeft: 8,
  },
});

export default AppHeader;
