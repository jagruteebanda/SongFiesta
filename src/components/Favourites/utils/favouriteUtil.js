import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

export const getFavouritesData = async () => {
	try {
		const value = await AsyncStorage.getItem('audio_track_favourites');
		if (value !== null) {
			let audioData = JSON.parse(value);
			return audioData;
		}
	} catch (e) {
		ToastAndroid.show('Error in Asyncstorage', ToastAndroid.SHORT);
	}
	return [];
};