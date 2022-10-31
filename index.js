/**
 * @format
 */
import React from 'react';
import {AppRegistry, AppState} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import Server_function from './src/global/Server_functions';
import call_DB from './src/global/db_functions';
import ConstantsVar from './src/global/ConstantsVar';
import AsyncStorage from '@react-native-async-storage/async-storage';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  AsyncStorage.setItem('Way', 'Index');

  if (ConstantsVar.HomescreenRef != null) {
    // ConstantsVar.HomescreenRef.BackgroundNotifyHandle(
    //   remoteMessage.data.Carrier,
    //   remoteMessage.data.Caption,
    //   remoteMessage.data.TrackingNumber,
    // );
  } else {
    AsyncStorage.setItem('RecInBackground', 'true');
    a = await AsyncStorage.getItem('TrackingNumberList');
    if (a == '' || a == null) {
      b = remoteMessage.data.TrackingNumber;
    } else {
      b = a + ',' + remoteMessage.data.TrackingNumber;
    }
    AsyncStorage.setItem('TrackingNumberList', b);
  }
});

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
