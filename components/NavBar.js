import React, { useContext } from 'react'
import { ArrowBackIcon, Box, Center, HStack, IconButton, Icon, StatusBar, Text } from 'native-base'
import { MaterialIcons} from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

// const Tab = createMaterialTopTabNavigator()

import HomeScreen from '../screens/Home'
import Room from '../screens/Room'
import RoomHB from './RoomHB'
// import RoomList from '../screens/RoomList'
// import Login from '../screens/Login'
// import { colors } from '../utils/styles'
// import CameraScreen from '../screens/CameraScreen'
{/* <Center paddingTop={10} paddingLeft={190} h="20"> */}
// </Center>
export default function NavBar({ room, themeNavStyle }) {

  return (
    <>
    <Center>
<StatusBar bg="#3700B3" barStyle="light-content" />
<Box safeAreaTop bg="violet.600" />
<HStack bg="violet.800" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="350">
<HStack alignItems="center">

    <HStack space= {20}>
    <ArrowBackIcon color="white"/>
    <Text color="white" fontSize="20" fontWeight="bold">Room Name</Text>
    <Text>{room}</Text>        
    </HStack>

    <HStack space={4}>
    <RoomHB/>
    </HStack>

    <HStack space={3}>
    <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
    <IconButton icon={<Ionicons name="settings-outline" size={24} color="black"/>} />
    <Ionicons name="settings-outline" size={24} color="black" />
    </HStack>

    </HStack>
    </HStack>
    </Center>
    </>
  )
}
