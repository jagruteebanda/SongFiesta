import React from 'react';
import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import audioUtil from './src/utils/AudioPlayerUtil';
import PlayerDetailsContainer from './src/components/Player/containers/PlayerDetailsContainer';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Pressable
        onPress={() =>
          audioUtil.playAudio(
            'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
          )
        }>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: 200, height: 40, paddingHorizontal: 30, backgroundColor: 'blue' }}>
          <Text style={{ color: 'white' }}>{'Play Audio'}</Text>
        </View>
      </Pressable>
      <Button title="Stop Audio" onPress={() => audioUtil.stopAudio()} />
      <Button
        title="Release Audio"
        onPress={() => audioUtil.releaseAudioPlayer()}
      />
    </View>
  );
}

const App = () => {
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={PlayerDetailsContainer} />
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
