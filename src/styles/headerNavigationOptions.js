import React from 'react';
import {Pressable, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const setHeaderNavigationOptions = (navigation, headerTitle = '') => {
  return {
    headerLeft: () => (
      <Pressable onPress={() => navigation?.openDrawer?.()}>
        <View style={{marginLeft: 16}}>
          <MaterialCommunityIcons name="menu" color={'#99004d'} size={24} />
        </View>
      </Pressable>
    ),
    headerTitle,
    headerStyle: {
      backgroundColor: '#000000',
      height: 60,
    },
    headerTitleStyle: {
      fontFamily: 'KleeOne-Regular',
      color: '#cc0066',
    },
  };
};
