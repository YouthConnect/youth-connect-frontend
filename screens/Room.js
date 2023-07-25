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
  HStack,
  Menu,
} from 'native-base';

import { Platform, View, KeyboardAvoidingView } from 'react-native';
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
      console.log(text)
      let newText = text.split(' ');
      console.log(newText)
      return newText[1];
    } else {
      return text;
    }
  };

  const isValidHttpUrl = str => {
    // alert("Image " + str)

    if (typeof str === 'string' && str.includes('Image')) {
      str.trimStart('Image ')
      // alert("Image " + testimage)
      return true
    } else return false
  }

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

        addNewMessage(payload);
      });
    } catch (error) {
      console.error('ERROR RECEIVING MESSAGE', error);
    }

    try {
      socket.on('SENDING RECENT MESSAGES', payload => {
        console.log('RECEIVED RECENT MESSAGES');
        setMessages([...messages, payload])
      })
    } catch (error) {
      console.error('ERROR RECEIVING RECENT MESSAGES', error);
    }

  }, [socket]);

  const handleEditMessage = (messageId, content) => {
    const updatedMessage = {
      id: messageId,
      text: content,
      username: user.username,
      timestamp: new Date().getTime(),
    };

    socket.emit('EDIT_MESSAGE', updatedMessage);

    return updatedMessage;
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await fetch(`/api/v1/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      socket.emit('DELETE_MESSAGE', messageId);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };


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
  // fetch delete to api/v1/messages/:id
  //     socket.emit('DELETE_MESSAGE', messageId);
  //   };



  return (
    // <KeyboardAvoidingView
    //   // h={{
    //   //   base: '400px',
    //   //   lg: 'auto',
    //   // }}
    //   // w={'100%'}
    //   // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   // style={{ flex: 1 }}
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={{ flex: 1 }}
    // >

    // colorScheme === 'light'
    // ? colors.backgroundDark
    // : colors.darkBackground

    <ThemedBox container={true} safeArea={true} style={{ flex: 1 }}>
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
          w={'100%'}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

          <ScrollView
            mt={5}
            maxH={500}
            alignContent={'center'}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          >
            <VStack mt={10} mb={50} space={4} alignItems='center'>
              {messages.length > 0 &&
                messages.map((message, i) => {
                  const isOutgoing = message.username === user.username;
                  const isEditMode = editMode && selectedMessage?.id === message.id;
                  return (
                    <HStack
                      key={i}
                      width={"95%"}
                      bg={isOutgoing ? '#05e2e6' : '#a7ef72'}//receiver color bright green
                      //bg={#05e2e6}//user color teal
                      color={'white'}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                      rounded='25px'
                      paddingTop={2}
                      paddingBottom={2}
                      shadow={3}
                      px={4}
                      py={2}
                      mb={2}
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
                        <>
                          <VStack alignItems={isOutgoing ? 'flex-end' : 'flex-start'}>
                            <ThemedText
                              style={{
                                ...themeTextStyle,
                              }}
                              fontSize={'md'}
                              text={`${message.username}: ${message.text}`}
                            />
                          </VStack>
                          {isOutgoing && (
                            <HStack>
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
                                  console.log(message.id, message) // <-- see if this outputs
                                  setMessages(messages.filter(msg => msg.id !== message.id));
                                }}
                              />
                            </HStack>
                          )}
                        </>
                      )}
                    </HStack>
                  );
                })}
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
        <Button
          w={20}
          style={[themeButtonStyle, { alignItems: 'center' }]}
          onPress={() => navigation.navigate('Camera')}
        >
          <Ionicons name='camera-outline' size={24} color='black' />
        </Button>

        {/* <View style={{ flexDirection: 'row' }}> */}
        {user?.username && (
          <VStack width={'100%'} style={{ flex: 1 }}>
            <HStack style={{ alignItems: 'center', width: '100%', paddingHorizontal: 10 }}>
              <View style={{ flex: 1 }}>
                {/* <FormControl.Label>Send a message</FormControl.Label> */}
                <Input
                  value={message}
                  style={themeContainerStyle}
                  onChangeText={setMessage}
                  placeholder="Send a message"
                  placeholderTextColor="black"
                />
              </View>
              <Button
                w={20}
                style={[themeButtonStyle]}
                mb='1'
                colorScheme='cyan'
                onPress={() => {
                  handleSubmit();
                  // onSend(messages)
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                disabled={!isValidRoom(room)}
              >
                <Ionicons name="send-outline" size={25}></Ionicons>
              </Button>

            </HStack>


          </VStack>
        )}
        {/* </View> */}
      </ThemedBackground>
    </ThemedBox>
    // </KeyboardAvoidingView >
  )
}

