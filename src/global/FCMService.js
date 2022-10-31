import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import Server_function from '../global/Server_functions';
import call_DB from '../global/db_functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConstantsVar from './ConstantsVar';

class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = onRegister => {
    messaging()
      .hasPermission()
      .then(enabled => {
        console.log(enabled);

        if (enabled == -1) {
          this.requestPermission(onRegister);

          // User has permissions
        } else {
          this.getToken(onRegister);

          // User doesn't have permission
          // this.requestPermission(onRegister);
        }
      })
      .catch(error => {
        console.log('[FCMService] Permission rejected ', error);
      });
  };

  getToken = onRegister => {
    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('[FCMService] User does not have a device token');
        }
      })
      .catch(error => {
        console.log('[FCMService] getToken rejected ', error);
      });
  };

  requestPermission = onRegister => {
    messaging()
      .requestPermission()
      .then(authorizationStatus => {
        if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
          console.log('User has notification permissions enabled.');
        } else if (
          authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
        ) {
          console.log('User has provisional notification permissions.');
        } else {
          console.log('User has notification permissions disabled');
        }
        this.getToken(onRegister);
      })
      .catch(error => {
        console.log('[FCMService] Request Permission rejected ', error);
      });
  };

  deleteToken = () => {
    console.log('[FCMService] deleteToken ');
    messaging()
      .deleteToken()
      .catch(error => {
        console.log('[FCMService] Delete token error ', error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // When the application is running, but in the background
    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        '[FCMService] onNotificationOpenedApp Notification caused app to open from background state:',
        remoteMessage,
      );
      if (remoteMessage) {
        AsyncStorage.setItem(
          'Way',
          'OnNoti' + remoteMessage.data.TrackingNumber,
        );

        if (ConstantsVar.HomescreenRef != null) {
          // ConstantsVar.HomescreenRef.BackgroundNotifyHandle(
          //   remoteMessage.data.Carrier,
          //   remoteMessage.data.Caption,
          //   remoteMessage.data.TrackingNumber,
          // );
        } else {
          AsyncStorage.setItem('RecInBackground', 'true');
          a = await AsyncStorage.getItem('TrackingNumberList');
          console.log(a);
          if (a == '' || a == null) {
            b = remoteMessage.data.TrackingNumber;
          } else {
            b = a + ',' + remoteMessage.data.TrackingNumber;
          }
          AsyncStorage.setItem('TrackingNumberList', b);
        }
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
        // this.removeDeliveredNotification(notification.notificationId)
      }
    });

    // When the application is opened from a quit state.
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        console.log(
          '[FCMService] getInitialNotification Notification caused app to open from quit state:',
          remoteMessage,
        );

        if (remoteMessage) {
          AsyncStorage.setItem(
            'Way',
            'GetIni' + remoteMessage.data.TrackingNumber,
          );
          if (ConstantsVar.HomescreenRef != null) {
            // ConstantsVar.HomescreenRef.BackgroundNotifyHandle(
            //   remoteMessage.data.Carrier,
            //   remoteMessage.data.Caption,
            //   remoteMessage.data.TrackingNumber,
            // );
          } else {
            AsyncStorage.setItem('RecInBackground', 'true');
            a = await AsyncStorage.getItem('TrackingNumberList');
            console.log(a);
            if (a == '' || a == null) {
              b = remoteMessage.data.TrackingNumber;
            } else {
              b = a + ',' + remoteMessage.data.TrackingNumber;
            }
            AsyncStorage.setItem('TrackingNumberList', b);
          }
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
          //  this.removeDeliveredNotification(notification.notificationId)
        }
      });

    // Foreground state messages
    this.messageListener = messaging().onMessage(async remoteMessage => {
      // call dashboard func if notify rec
      AsyncStorage.setItem('Way', 'FCM');
      console.log('[FCMService] A new FCM message arrived!', remoteMessage);  
      if (ConstantsVar.HomescreenRef != null) {
        // ConstantsVar.HomescreenRef.BackgroundNotifyHandle(
        //   remoteMessage.data.Carrier,
        //   remoteMessage.data.Caption,
        //   remoteMessage.data.TrackingNumber,
        // );
      } else {
        AsyncStorage.setItem('RecInBackground', 'true');
        a = await AsyncStorage.getItem('TrackingNumberList');
        console.log(a);
        if (a == '' || a == null) {
          b = remoteMessage.data.TrackingNumber;
        } else {
          b = a + ',' + remoteMessage.data.TrackingNumber;
        }
        AsyncStorage.setItem('TrackingNumberList', b);
      }

      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage.data.notification;
        } else {
          notification = remoteMessage.notification;
        }
        onNotification(notification);
      }
    });

    // Triggered when have new token
    messaging().onTokenRefresh(fcmToken => {
      console.log('[FCMService] New token refresh: ', fcmToken);
      onRegister(fcmToken);
    });
  };

  unRegister = () => {
    this.messageListener();
  };
}

export const fcmService = new FCMService();
