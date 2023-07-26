import { Menu, Pressable, Button, Box, Center, useDisclose } from 'native-base'
import React, { useContext } from 'react'
import socket from '../utils/socket'
import { ThemeContext, UserContext } from '../App'
import { Text } from 'native-base'
import CreateRoomModal from './CreateRoomModal'
import { deleteRoom } from '../utils/APIFunctions'
import { styles } from '../utils/styles'
import ThemedText from './ThemedText'
import { Ionicons } from '@expo/vector-icons';

export default function RoomHB() {
  const { themeButtonStyle, themeContainerStyle, colorScheme } = useContext(ThemeContext)

  const { user, setRoom, rooms, room, setRooms } = useContext(UserContext)

  const isValidRoom = room => {
    let valid = room !== 'none' && room !== null && room !== undefined
    return valid
  }

  return (
    <Center>
      <Menu
        rooms={rooms}
        style={[themeContainerStyle]}
        h='200'
        closeOnSelect={true}
        onOpen={() => console.log('opened')}
        onClose={() => {
          console.log('closed')
        }}
        trigger={triggerProps => {
          return (
            <Button style={themeButtonStyle} {...triggerProps}>
              {isValidRoom(room) ? 'Change Room' : 'Join a Room'}
            </Button>
          )
        }}
      >
        <Menu.OptionGroup defaultValue='Rooms' title='Rooms' type='radio'>
          {rooms?.length > 0 &&
            rooms.map((room, i) => {
              return (
                <Menu.ItemOption
                  style={themeContainerStyle}
                  value={room.name}
                  key={i}
                  onPress={() => {
                    socket.emit('join', { room: room.name })
                    setRoom(room.name)
                  }}
                >
                  <Text color={colorScheme === 'dark' ? 'white' : 'black'}>{room.name}</Text>
                  <>
                    {/* {user.role === "admin"
                    } */}
                    {/* <Ionicons
                      name='trash-outline'
                      size={20}
                      color='gray'
                      onPress={() => { }}
                    /> */}
                  </>
                </Menu.ItemOption>
              )
            })}
          {/* <Menu.ItemOption
              style={themeContainerStyle}
              value={'Create'}
              key={99}
              onPress={() => {handleCreateRoom}}
            ></Menu.ItemOption> */}
        </Menu.OptionGroup>
        {/*<Divider mt="3" w="100%" />
            <Menu.OptionGroup title="Edit Rooms" type="checkbox">
                <Menu.ItemOption value="Add a Room">Add a Room</Menu.ItemOption>
                <Menu.ItemOption value="Delete a Room">Delete a Room</Menu.ItemOption>
                </Menu.OptionGroup>*/}
      </Menu>
    </Center>
  )
}
