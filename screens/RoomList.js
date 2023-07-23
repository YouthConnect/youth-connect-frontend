import React, { useState, useEffect, useContext } from 'react';

import { ScrollView, VStack, Center, Button } from 'native-base';
import { ThemeContext, UserContext } from '../App';
import socket from '../utils/socket';
import CreateRoomModal from '../components/CreateRoomModal';
import ThemedText from '../components/ThemedText';
import ThemedBox from '../components/ThemedBox';
import ThemedBackground from '../components/ThemedBackground';

export default function RoomList({ navigation }) {
  const { themeButtonStyle, themeContainerStyle, themeTextStyle } =
    useContext(ThemeContext);
  const { user, setRoom, rooms, room } = useContext(UserContext);

  useEffect(() => {
    if (room !== 'none') {
      navigation.navigate(room);
    }
  }, [room]);

  return (
    <ThemedBox container={true}>
      <ThemedBackground>
        {user?.username ? (
          <>
            <ThemedText
              mt={10}
              marginLeft={5}
              style={themeTextStyle}
              fontSize={'lg'}
              text='Join a room:'
            />

            <CreateRoomModal />
            <ScrollView maxH={500}>
              <VStack
                mt={5}
                space={4}
                alignItems='center'
              >
                {rooms?.length > 0 &&
                  rooms.map((room, i) => {
                    return (
                      <Button
                        key={i}
                        bg='transparent'
                        style={[themeButtonStyle]}
                        onPress={() => {
                          socket.emit('join', { room: room.name });
                          setRoom(room.name);
                        }}
                      >
                        <Center
                          w='64'
                          h='20'
                          style={themeContainerStyle}
                          rounded='md'
                          shadow={3}
                        >
                          {room.name}
                        </Center>
                      </Button>
                    );
                  })}
              </VStack>
            </ScrollView>
          </>
        ) : (
          <ThemedText
            mt={0}
            textAlign='center'
            fontSize={'lg'}
            style={themeTextStyle}
            text='Please Log in first'
          />
        )}
      </ThemedBackground>
    </ThemedBox>
  );
}
