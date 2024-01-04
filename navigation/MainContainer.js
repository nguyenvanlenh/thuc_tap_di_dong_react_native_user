import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import MessageScreen from './screens/MessageScreen';
import AccountScreen from './screens/AccountScreen';
import { QrCode } from './screens/QrCode';
import { useSelector } from 'react-redux';
import MessengerHomeAdmin from './screens/MessengerHomeAdmin';
import { useNavigation } from '@react-navigation/native';


//Screen names
const homeName = "Trang chủ";
const categoryName = "Danh mục";
const scaner = "Quét";
const messageName = "Tin nhắn";
const accountName = "Tài khoản";

const Tab = createBottomTabNavigator();

function MainContainer() {
  const auth = useSelector(state => state.auth)

  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';

          } else if (rn === categoryName) {
            iconName = focused ? 'grid' : 'grid-outline';

          } else if (rn === scaner) {
            iconName = focused ? 'qr-code-outline' : 'qr-code-outline';

          } else if (rn === messageName) {
            iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
          }
          else if (rn === accountName) {
            iconName = focused ? 'happy' : 'happy-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;

        },
        headerShown: route.name === messageName ? true : false,
        tabBarLabelStyle: {
          paddingBottom: 6,
          fontSize: 10,
        },
        tabBarStyle: {
          padding: 4,
          display: route.name === messageName ? 'none' : 'flex'
        }
      })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={categoryName} component={CategoryScreen} />
      <Tab.Screen name={scaner} component={QrCode} />
      {
        auth?.user?.email == 'admin@gmail.com' ? (
          <Tab.Screen name={messageName} component={MessengerHomeAdmin} />
        ) : (
          <Tab.Screen name={messageName} component={MessageScreen} />
        )
      }

      <Tab.Screen name={accountName} component={AccountScreen} />
    </Tab.Navigator>
  );
}


export default MainContainer;