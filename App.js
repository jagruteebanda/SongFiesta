import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlayerDetailsContainer from './src/components/Player/containers/PlayerDetailsContainer';
import HomeScreen from './src/components/Home/containers/HomeScreen';
import FavouritesScreen from './src/components/Favourites/containers/FavouritesScreen';
import SplashScreen from './src/components/Splash/containers/SplashScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="SplashScreen"
            component={SplashScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="PlayerDetailsScreen"
            component={PlayerDetailsContainer}
          />
          <Stack.Screen name="FavouritesScreen" component={FavouritesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
});

export default App;
