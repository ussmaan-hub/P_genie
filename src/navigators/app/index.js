import * as React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard_Screen from '../../components/dashboard';
import Register_Screen from '../../components/register';
import Detail_Screen from '../../components/detail';
import barCodeScanner from '../../components/barCodeScanner';
import TimeAndCost1 from '../../components/time&cost1';
import TimeAndCost2 from '../../components/time&cost2';
import TimeAndCost3 from '../../components/time&cost3';
import AddressBook from '../../components/addressBook';
import AddressList from '../../components/addressList';
import StoreLocator from '../../components/store_locator';
import DeviceInfo from 'react-native-device-info';
import CustomSidebarMenu from '../../containers/CustomSidebarMenu';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ConstantsVar from '../../global/ConstantsVar';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const isTablet = DeviceInfo.isTablet();
const wp = ConstantsVar.isPortrait()
  ? widthPercentageToDP
  : heightPercentageToDP;

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function Home_ScreenStack({navigation}) {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Dashboard_Screen"
        component={Dashboard_Screen}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen
        name="Detail_Screen"
        component={Detail_Screen}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen
        name="barCodeScanner"
        component={barCodeScanner}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: forFade,
        }}
      />
    </Stack.Navigator>
  );
}

function Register_ScreenStack({navigation}) {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Register_Screen"
        component={Register_Screen}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: forFade,
        }}
      />
    </Stack.Navigator>
  );
}

function TimeAndCost_ScreenStack({navigation}) {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="TimeAndCost1"
        component={TimeAndCost1}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen
        name="TimeAndCost2"
        component={TimeAndCost2}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen
        name="TimeAndCost3"
        component={TimeAndCost3}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: forFade,
        }}
      />
    </Stack.Navigator>
  );
}

function AddressBook_ScreenStack({navigation}) {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="AddressList"
        component={AddressList}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen
        name="AddressBook"
        component={AddressBook}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: forFade,
        }}
      />
    </Stack.Navigator>
  );
}

function StoreLocator_ScreenStack({navigation}) {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="StoreLocator"
        component={StoreLocator}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: forFade,
        }}
      />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <Drawer.Navigator
      initialRouteName="DashboardPage"
      drawerContent={props => <CustomSidebarMenu {...props} />}
      drawerStyle={{
        backgroundColor: 'white',
        width: isTablet ? '50%' : '60%',
      }}
      drawerContentOptions={{
        activeTintColor: '#11B7E5',
        itemStyle: {marginVertical: wp(1.5)},
        labelStyle: {
          color: '#5A5C5E',
          fontSize: isTablet ? wp(3) : wp(4),
        },
      }}>
      <Drawer.Screen
        name="DashboardPage"
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({color}) => (
            <Image
              source={require('../../utils/assets/home.png')}
              resizeMode="contain"
              style={{
                width: isTablet ? wp(4) : wp(5),
                height: isTablet ? wp(4) : wp(5),
                tintColor: color,
              }}
            />
          ),
        }}
        component={Home_ScreenStack}
      />
      <Drawer.Screen
        name="TimeAndCostPage"
        options={{
          drawerLabel: 'Time and Cost',
          drawerIcon: ({color}) => (
            <Image
              source={require('../../utils/assets/clock.png')}
              resizeMode="contain"
              style={{
                width: isTablet ? wp(4) : wp(5),
                height: isTablet ? wp(4) : wp(5),
                tintColor: color,
              }}
            />
          ),
        }}
        component={TimeAndCost_ScreenStack}
      />
      <Drawer.Screen
        name="AddressListPage"
        options={{
          drawerLabel: 'Address Book',
          drawerIcon: ({color}) => (
            <Image
              source={require('../../utils/assets/Address.png')}
              resizeMode="contain"
              style={{
                width: isTablet ? wp(4) : wp(5),
                height: isTablet ? wp(4) : wp(5),
                tintColor: color,
              }}
            />
          ),
        }}
        component={AddressBook_ScreenStack}
      />
      {/* <Drawer.Screen
        name="RegisterPage"
        options={{
          drawerLabel: 'Register',
          drawerIcon: ({color}) => (
            <Image
              source={require('../../utils/assets/edit.png')}
              resizeMode="contain"
              style={{
                width: isTablet ? wp(4) : wp(5),
                height: isTablet ? wp(4) : wp(5),
                tintColor: color,
              }}
            />
          ),
        }}
        component={Register_ScreenStack}
      /> */}
      <Drawer.Screen
        name="StoreLocatorPage"
        options={{
          drawerLabel: 'Store Locator',
          drawerIcon: ({color}) => (
            <Image
              source={require('../../utils/assets/placeholder.png')}
              resizeMode="contain"
              style={{
                width: isTablet ? wp(4) : wp(5),
                height: isTablet ? wp(4) : wp(5),
                tintColor: color,
              }}
            />
          ),
        }}
        component={StoreLocator_ScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default App;
