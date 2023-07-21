import {
  VStack,
  FormControl,
  Input,
  Box,
  Text,
  Center,
  Button,
  ScrollView,
} from 'native-base';

import React, { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { ImageBackground } from 'react-native';

import * as Haptics from 'expo-haptics';

import { colors, styles } from '../utils/styles';
import { UserContext, ThemeContext } from '../App';
import socket from '../utils/socket';

export default function Room({ route, navigation }) {
  const { colorScheme, bgImage } = useContext(ThemeContext);
  const { user, room, setRoom } = useContext(UserContext);

  let themeContainerStyle;
  let themeTextStyle;

  if (colorScheme === 'dark') {
    themeContainerStyle = styles.darkContainer;
    themeTextStyle = styles.darkThemeText;
  } else {
    themeContainerStyle = styles.lightContainer;
    themeTextStyle = styles.lightThemeText;
  }

  const handleSubmit = () => {
    const payload = {
      text: message,
      room: room,
      username: user.username,
    };

    socket.emit('MESSAGE', payload);
    setMessages([...messages, payload]);
    setMessage('');
  };
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');


  useEffect(() => {
    function fetchMessages() {
      try {
      fetch(`https://youth-connect-server.onrender.com/api/v1/messages`)
        .then(res => res.json())
        .then(data => {
          let filteredMessages = data.filter(message => message.room === room);

          setMessages(filteredMessages);
        }) 
      } catch(err) {
        console.error('ERROR FECTHING MESSAGES: ', err)
      } 
        
    }

    fetchMessages();
  }, [room]);

  const addNewMessage = (message) => {
    setMessages([...messages, message])
  }

  const isValidRoom = (room) => {
    return room !== 'none' && room !== null && room !== undefined
  }

  useEffect(() => {
    console.log('messages: ', messages)
    socket.on('NEW MESSAGE', (payload) => addNewMessage)   
  }, [socket, messages])

  return (
    <Box
      style={[styles.container, themeContainerStyle]}
      safeArea
    >
      <ImageBackground
        source={bgImage}
        resizeMode='cover'
        style={{ flex: 1 }}
      >
        <Box mt={12}>
          {isValidRoom(room) ? (
            <>
              <Text fontSize={'md'}>Signed in as: {user.username}</Text>
              <Text fontSize='md'>You are in room: {room}</Text>
            </>
          ) : (
            <Text
              style={themeTextStyle}
              textAlign={'center'}
              fontSize={'lg'}
            >
              Please join a room
            </Text>
          )}

          {isValidRoom(room) && (
            <Button
              size={'sm'}
              onPress={() => {
                setMessages([]);
                setRoom('none');
                navigation.navigate('Rooms');
              }}
            >
              Leave
            </Button>
          )}
        </Box>

        <ScrollView
          mt={5}
          maxH={400}
          alignContent={'center'}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <VStack
            mt={10}
            mb={50}
            space={4}
            alignItems='center'
          >
            {messages.length > 0 &&
              messages.map((message, i) => {
                return (
                  <Center
                    key={i}
                    w='80'
                    bg={
                      colorScheme === 'light'
                        ? colors.backgroundDark
                        : colors.darkBackground
                    }
                    rounded='md'
                    shadow={3}
                  >
                    <Text
                      style={themeTextStyle}
                      fontSize={'md'}
                    >
                      {message.username}: {message.text}
                    </Text>
                  </Center>
                );
              })}
          </VStack>
        </ScrollView>
        {user?.username && (
          <VStack>
            <FormControl>
              <FormControl.Label>Send a message</FormControl.Label>
              <Input
                value={message}
                style={themeContainerStyle}
                onChangeText={setMessage}
              />
            </FormControl>
            <Button
              mt='2'
              colorScheme='cyan'
              onPress={() => {
                handleSubmit();
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              disabled={!isValidRoom(room)}
            >
              Send
            </Button>
          </VStack>
        )}
      </ImageBackground>
    </Box>
  );
}