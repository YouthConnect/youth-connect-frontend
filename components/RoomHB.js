import { Menu, Pressable, Button, Box, useDisclose } from 'native-base'
import React, { useContext } from 'react'
import socket from '../utils/socket'
import { ThemeContext, UserContext } from '../App'

export default function RoomHB() {
  const { themeButtonStyle } = useContext(ThemeContext)

  const { user, setRoom, rooms } = useContext(UserContext)

  return (
    <Box>
      {/* w="90%" alignItems="right" */}
      <Menu
        closeOnSelect={true}
        w='190'
        onOpen={() => console.log('opened')}
        onClose={() => {
          console.log('closed')
        }}
        trigger={triggerProps => {
          return (
            <Button style={themeButtonStyle} {...triggerProps}>
              Join a room
            </Button>
          )
        }}
      >
        <Menu.OptionGroup defaultValue='Rooms' title='Rooms' type='radio'>
          {rooms?.length > 0 &&
            rooms.map((room, i) => {
              return (
                <Menu.ItemOption
                  value={room.name}
                  key={i}
                  onPress={() => {
                    socket.emit('join', { room: room.name })
                    setRoom(room.name)
                  }}
                >
                  {room.name}
                </Menu.ItemOption>
              )
            })}
        </Menu.OptionGroup>
        {/*<Divider mt="3" w="100%" />
            <Menu.OptionGroup title="Edit Rooms" type="checkbox">
                <Menu.ItemOption value="Add a Room">Add a Room</Menu.ItemOption>
                <Menu.ItemOption value="Delete a Room">Delete a Room</Menu.ItemOption>
                </Menu.OptionGroup>*/}
      </Menu>
    </Box>
  )
}