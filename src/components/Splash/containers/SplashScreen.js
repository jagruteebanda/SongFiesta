import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SplashScreen = props => {
  const {navigation} = props;

  useEffect(() => {
    setTimeout(() => {
      navigation?.navigate?.('Drawer');
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0d0d0d',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <MaterialCommunityIcons
        name="music-note-sixteenth-dotted"
        color={'#99004d'}
        size={150}
      />
      <Text
        style={{
          fontFamily: 'Quintessential-Regular',
          fontSize: 32,
          color: '#cc0066',
        }}>
        {'SongFiesta'}
      </Text>
    </View>
  );
};

export default SplashScreen;
