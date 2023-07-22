import React, { useContext } from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()

import HomeScreen from '../screens/Home'
import RoomList from '../screens/RoomList'
import Login from '../screens/Login'
import Room from '../screens/Room'
import { colors } from '../utils/styles'

export default function TabNav({ room, themeNavStyle }) {
  const screenOptions = {
    unmountOnBlur: false,
    headerShown: false,
    tabBarItemStyle: {
      ...themeNavStyle,
    },
  }

  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{ ...screenOptions }}>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Login' component={Login} />
      <Tab.Screen name='Rooms' component={RoomList} />
      <Tab.Screen name={'Room'} /*displayName={room}*/ component={Room} />
    </Tab.Navigator>
  )
}
