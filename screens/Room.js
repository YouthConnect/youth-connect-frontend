import {
  VStack,
  FormControl,
  Input,
  Box,
  Text,
  Image,
  Center,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Menu,
  HStack,
} from 'native-base';

import { Platform } from 'react-native';
import RoomHB from '../components/RoomHB';
import React, { useEffect, useState, useContext } from 'react';
import ThemedBox from '../components/ThemedBox';
import * as Haptics from 'expo-haptics';
import { colors, styles } from '../utils/styles';
import { UserContext, ThemeContext } from '../App';
import socket from '../utils/socket';
import ThemedText from '../components/ThemedText';
import ThemedBackground from '../components/ThemedBackground';
import { Ionicons } from '@expo/vector-icons';

export default function Room({ route, navigation }) {
  const {
    colorScheme,
    bgImage,
    themeButtonStyle,
    themeContainerStyle,
    themeTextStyle,
  } = useContext(ThemeContext);
  const { user, room, setRoom, pickedImagePath } = useContext(UserContext);
  const [toChatBot, setToChatBot] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const testimage = 'https://i.imgur.com/2nCt3Sbl.jpg';

  const handleSubmit = () => {
    const payload = {
      text: message,
      room: room,
      username: user.username,
      timestamp: new Date().getTime(), // Add timestamp to the payload
    };

    socket.emit('MESSAGE', payload);
    setMessages([...messages, payload]);
    setMessage('');
  };

  const sendToChatBot = () => {
    socket.emit('TO CHAT BOT', toChatBot);
  };

  useEffect(() => {
    socket.emit('GET RECENT MESSAGES', room);
  }, [room]);

  const addNewMessage = message => {
    console.log('NEW MESSAGE', message);
    setMessages([...messages, message]);
  };

  const isValidRoom = room => {
    let valid = room !== 'none' && room !== null && room !== undefined;
    return valid;
  };

  const imageTrim = (text, name) => {
    if (user.username === name) {
      let newText = text.split(' ');
      return newText[1];
    } else {
      return text;
    }
  };

  const isValidHttpUrl = str => {
  };

  useEffect(() => {
    if (room === 'none' || room === 'Chat') {
      navigation.navigate('Home');
    } else {
      console.log('ROOM CHANGED', room);
      navigation.navigate(room);
    }
  }, [room]);

  useEffect(() => {
    try {
      socket.on('NEW MESSAGE', payload => {
        console.log(payload);
        addNewMessage(payload);
      });
    } catch (error) {
      console.error('ERROR RECEIVING MESSAGE', error);
    }

    try {
      socket.on('SENDING RECENT MESSAGES', payload => {
        setMessages(payload);
      });
    } catch (error) {
      console.error('ERROR RECEIVING RECENT MESSAGES', error);
    }

  }, [socket]);

  // const handleEditMessage = (messageId, content) => {
  //   const updatedMessage = {
  //     id: messageId,
  //     text: content,
  //     username: user.username,
  //     timestamp: new Date().getTime(),
  //   };
  // };
  //   socket.emit('EDIT_MESSAGE', updatedMessage);

  //   const handleDeleteMessage = (messageId) => {
  //     socket.emit('DELETE_MESSAGE', messageId);
  //   };



    return (
      <ThemedBox container={true} safeArea={true}>
        <ThemedBackground source={bgImage} resizeMode='cover' style={{ flex: 1 }}>
          <Box flex={1} mt={15} p={3} mb={-3}>
            {!isValidRoom(room) && (
              <ThemedText
                style={themeTextStyle}
                textAlign={'center'}
                fontSize={'lg'}
                text={'Please join a room'}
              ></ThemedText>
            )}

            {isValidRoom(room) && (
              <>
                <Button
                  size={'sm'}
                  p={3}
                  style={[themeButtonStyle]}
                  onPress={() => {
                    setMessages([]);
                    setRoom('none');
                  }}
                >
                  Leave
                </Button>
                <RoomHB />
              </>

            )}
          </Box>
          <KeyboardAvoidingView
            h={{
              base: '400px',
              lg: 'auto',
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView
              mt={5}
              maxH={400}
              alignContent={'center'}
              contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            >
              <VStack mt={10} mb={50} space={4} alignItems='center'>
                {messages.length > 0 &&
                  messages.map((message, i) => {
                    const isOutgoing = message.username === user.username;
                    const isEditMode = editMode && selectedMessage?.id === message.id;
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
                        {isValidHttpUrl(message.text) ? (
                          <Image
                            key={i}
                            source={{
                              uri: imageTrim(message.text, message.username),
                            }}
                            style={{ width: 200, height: 200 }}
                            alt={`${user.username} Image ${i}`}
                          />
                        ) : (
                          <HStack space={2} alignItems='center'>
                            <ThemedText
                              style={themeTextStyle}
                              fontSize={'md'}
                              text={`${message.username}: ${message.text}`}
                            />
                            {isOutgoing && (
                              <>
                                <Ionicons
                                  name='create-outline'
                                  size={20}
                                  color='gray'
                                  onPress={() => {
                                    setEditMode(true);
                                    setSelectedMessage(message);
                                  }}
                                />
                                <Ionicons
                                  name='trash-outline'
                                  size={20}
                                  color='gray'
                                  onPress={() => {
                                    handleDeleteMessage(message.id);
                                    setMessages(messages.filter(msg => msg.id !== message.id));
                                  }}
                                />
                              </>
                            )}
                          </HStack>
                        )}
                      </Center>
                    );
                  })}
              </VStack>
            </ScrollView>
          </KeyboardAvoidingView>
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
                style={[themeButtonStyle]}
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
              <Button onPress={() => navigation.navigate('Camera')}>
                {/* Camera */}
                <Ionicons name='camera-outline' size={24} color='black' />
              </Button>
            </VStack>
          )}
        </ThemedBackground>
      </ThemedBox>
    );
  }
