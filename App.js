import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import PlayerDetailsContainer from './src/components/Player/containers/PlayerDetailsContainer';
import HomeScreen from './src/components/Home/containers/HomeScreen';
import FavouritesScreen from './src/components/Favourites/containers/FavouritesScreen';
import SplashScreen from './src/components/Splash/containers/SplashScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navigation}) => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#000000',
        },
        drawerActiveTintColor: '#cc0066',
        drawerInactiveTintColor: '#808080',
        overlayColor: 'rgba(204, 0, 102, 0.4)',
      }}>
      <Drawer.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Drawer.Screen name="Favourites" component={FavouritesScreen} />
    </Drawer.Navigator>
  );
};

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
            name="Drawer"
            component={DrawerNavigator}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="PlayerDetailsScreen"
            component={PlayerDetailsContainer}
          />
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
