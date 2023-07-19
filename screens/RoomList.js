import React, { useState, useLayoutEffect, useContext } from 'react';

import { Box, ScrollView, VStack, Center, Button, Text } from 'native-base';
import { ImageBackground } from 'react-native';

import { ThemeContext, UserContext } from '../App';
import { styles } from '../utils/styles';

export default function RoomList({ navigation }) {
  const { colorScheme, bgImage } = useContext(ThemeContext);
  const { user, setRoom } = useContext(UserContext);
  let themeContainerStyle;
  let themeTextStyle;

  if (colorScheme === 'dark') {
    themeContainerStyle = styles.darkContainer;
    themeTextStyle = styles.darkThemeText;
  } else {
    themeContainerStyle = styles.lightContainer;
    themeTextStyle = styles.lightThemeText;
  }

  const [rooms, setRooms] = useState([]);

  useLayoutEffect(() => {
    function fetchRooms() {
      fetch('https://youth-connect-backend.onrender.com/api/v1/rooms')
        .then(res => res.json())
        .then(data => {
          setRooms(data);
        })
        .catch(err => console.error(err));
    }
    fetchRooms();
  }, []);

  return (
    <Box style={[styles.container, themeContainerStyle]}>
      <ImageBackground
        source={bgImage}
        resizeMode='cover'
        style={{ flex: 1 }}
      >
        {user?.username ? (
          <>
            <Text
              mt={10}
              marginLeft={5}
              style={themeTextStyle}
              fontSize={'lg'}
            >
              Join a room:
            </Text>
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
                        onPress={() => {
                          navigation.navigate('Room');
                          setRoom(room.name);
                        }}
                      >
                        <Center
                          w='64'
                          h='20'
                          bg={`cyan.${i + 1}00`}
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
          <Text
            mt={12}
            textAlign='center'
            fontSize={'lg'}
            style={themeTextStyle}
          >
            Please Log in first
          </Text>
        )}
      </ImageBackground>
    </Box>
  );
}
