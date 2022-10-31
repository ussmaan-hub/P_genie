import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigators/app';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fcmService} from './src/global/FCMService';
// import {localNotificationService} from './src/LocalNotificationService';
LogBox.ignoreLogs(['VirtualizedLists', 'componentWillReceiveProps']);
LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends React.Component {
  async componentDidMount() {
    SplashScreen.hide();
    fcmService.register(
      this.onRegister,
      this.onNotification,
      this.onOpenNotification,
    );
    // localNotificationService.configure(this.onOpenNotification);
  }

  onRegister(token) {
    console.log('[App] onRegister: ', token);
    global.AppToken = token;
    AsyncStorage.setItem('UserAppToken', token);
  }

  onNotification(notify) {
    console.log('[App] onNotification: ', notify);
    const options = {
      soundName: 'default',
      playSound: true, //,
      // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
      // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
    };
    // localNotificationService.showNotification(
    //   0,
    //   notify.title,
    //   notify.body,
    //   notify,
    //   options,
    // );
  }

  onOpenNotification(notify) {}
  x;
  render() {
    return (
      <NavigationContainer>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <AppNavigator />
        </SafeAreaView>
      </NavigationContainer>
    );
  }
}
