import React, { useContext } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


import HomeScreen from '../screens/Home';
import RoomList from '../screens/RoomList';
import Login from '../screens/Login';
import Room from '../screens/Room';
import Camera from '../screens/CameraScreen'

export default function TabNav({ user, room, themeNavStyle }) {

  const screenOptions = {
    unmountOnBlur: false,
    headerShown: false,
    tabBarItemStyle: {
      ...themeNavStyle
    },
  };

  return (

    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{ ...screenOptions }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
      />
      {/*
      <Tab.Screen
        name='Login'
        component={Login}
      />
    */}
      {user?.username && (
        <Tab.Screen
          name='RoomList'
          component={RoomList}
        />
      )}
      {user?.username && (
        <Tab.Screen
          name={room !== 'none' ? room : 'Chat'}
          title={'Room'}
          component={Room}
        />
      )}

      <Tab.Screen name='Camera' component={Camera} />

    </Tab.Navigator>
  );
}
