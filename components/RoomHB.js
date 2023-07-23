
import {  Menu, Pressable, ThreeDotsIcon, Box, Divider } from 'native-base'
import React, { useState, useLayoutEffect, useContext } from 'react'
import socket from '../utils/socket'
import { ThemeContext, UserContext } from '../App'

export default function RoomHB({navigation}) {

    const { user, setRoom, rooms, room, setRooms } = useContext(UserContext)
    return <Box w="90%" alignItems="right">
        <Menu closeOnSelect={false} w="190" onOpen={() => console.log("opened")} onClose={() => console.log("closed")} trigger={triggerProps => {
            return <Pressable {...triggerProps}>
                <ThreeDotsIcon />
            </Pressable>;
        }}>
            <Menu.OptionGroup defaultValue="Rooms" title="Rooms" type="radio">
                {rooms?.length > 0 &&
                    rooms.map((room, i) => {
                        return (
                            <>
                                <Menu.ItemOption value={room.name}
                                onPress={() => {
                          socket.emit('join', { room: room.name })
                          setRoom(room.name)
                          navigation.navigate('Room')

                        }}
                        >{room.name}</Menu.ItemOption>
                            </>
                        )
                    }
                    )}
            </Menu.OptionGroup>
            <Divider mt="3" w="100%" />
            <Menu.OptionGroup title="Edit Rooms" type="checkbox">
                <Menu.ItemOption value="Add a Room">Add a Room</Menu.ItemOption>
                <Menu.ItemOption value="Delete a Room">Delete a Room</Menu.ItemOption>
            </Menu.OptionGroup>
        </Menu>
    </Box>;
}