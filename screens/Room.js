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
} from 'native-base'

import * as ImagePicker from 'expo-image-picker'

import {
  Platform,
  View,
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
} from 'react-native'
import RoomHB from '../components/RoomHB'
import React, { useEffect, useState, useContext, useRef } from 'react'
import ThemedBox from '../components/ThemedBox'
import * as Haptics from 'expo-haptics'
import { colors, styles } from '../utils/styles'
import { UserContext, ThemeContext } from '../App'
import socket from '../utils/socket'
import ThemedText from '../components/ThemedText'
import ThemedBackground from '../components/ThemedBackground'
import { Ionicons } from '@expo/vector-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Room({ route, navigation }) {
  const messageInputRef = useRef(null);
  const {
    colorScheme,
    bgImage,
    themeButtonStyle,
    themeContainerStyle,
    themeTextStyle,
  } = useContext(ThemeContext)
  const { user, room, setRoom, pickedImagePath, setPickedImagePath } =
    useContext(UserContext)
  const [toChatBot, setToChatBot] = useState('')
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)

  const testimage = 'https://i.imgur.com/2nCt3Sbl.jpg'

  const handleSubmit = () => {
    const payload = {
      text: message,
      room: room,
      username: user.username,
      timestamp: new Date().getTime(), // Add timestamp to the payload
    }
    socket.emit('MESSAGE', payload)
    setMessages([...messages, payload])
    setMessage('')
  }

  const sendToChatBot = () => {
    socket.emit('TO CHAT BOT', toChatBot)
  }

  useEffect(() => {
    if (room === 'none' || room === 'Chat') {
      navigation.navigate('Home')
    } else {
      console.log('ROOM CHANGED', room)
      navigation.navigate(room)
      socket.emit('GET RECENT MESSAGES', room)
    }
  }, [room])

  const addNewMessage = payload => {
    console.log('NEW MESSAGE', message, messages)
    setMessages([...messages, payload])
  }

  const isValidRoom = room => {
    let valid = room !== 'none' && room !== null && room !== undefined
    return valid
  }

  const imageTrim = (text, name) => {
    if (user.username === name) {
      console.log(text)
      let newText = text.split(' ')
      console.log(newText)
      return newText[1]
    } else {
      return text
    }
  }

  const isValidHttpUrl = str => {
    // alert("Image " + str)

    if (typeof str === 'string' && str.includes('Image')) {
      str.trimStart('Image ')
      // alert("Image " + testimage)
      return true
    } else return false
  }

  useEffect(() => {
    try {
      socket.on('NEW MESSAGE', payload => {
        console.log('NEW MESSAGE', messages, payload)
        if (typeof payload === 'object') {
          setMessages([...messages, payload])
        }
      })
    } catch (error) {
      console.error('ERROR RECEIVING MESSAGE', error)
    }

    try {
      socket.on('SENDING RECENT MESSAGES', payload => {

        if (messages.length < 1) { // WARNING <- REMOVE ME
          console.log('RECEIVED RECENT MESSAGES', payload)
          setMessages(payload)
        }
      })
    } catch (error) {
      console.error('ERROR RECEIVING RECENT MESSAGES', error)
    }
  }, [socket])

  const handleEditMessage = (messageId, content) => {
    const updatedMessage = {
      id: messageId,
      text: content,
      username: user.username,
      timestamp: new Date().getTime(),
    }

    socket.emit('EDIT_MESSAGE', updatedMessage)

    return updatedMessage
  }

  const handleDeleteMessage = async messageId => {
    try {
      /* await fetch(
        `https://youth-connect-backend/api/v1/messages/${messageId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )*/

      socket.emit('DELETE_MESSAGE', { messageId, room })
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

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

  const handleCameraImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    if (permissionResult.granted === false) {
      alert('Sorry, we need camera  permissions to make this work!')
      return
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
      return
    }

    // have we verified the format?
    //
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true, //this is what we want to send to the socket server
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      const displayedImage = result.assets[0]
      // setImage(result);
      setPickedImagePath(result.assets[0].uri) //we want to send base64, not uri

      const payload = {
        text: 'Image ' + result.assets[0].uri,
        room: room,
        username: user.username,
        isImage: true,
      }
      // alert(payload);
      socket.emit('MESSAGE', payload)
    }
  }

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      // setImage(result);
      setPickedImagePath(result.assets.uri)

      const payload = {
        text: 'Image ' + result.uri,
        room: room,
        username: user.username,
        isImage: true,
      }
      socket.emit('MESSAGE', payload)
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    // style={{ flex: 1 }}
    >

      {/* // colorScheme === 'light'
    // ? colors.backgroundDark
    // : colors.darkBackground */}

      < ThemedBox container={true} safeArea={true}>
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
                <RoomHB />
              </>
            )}
          </Box>
          <ScrollView
            mt={5}
            maxH={500}
            alignContent={'center'}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          >
            <VStack mt={10} mb={50} space={4} alignItems='center'>
              {messages.length > 0 &&
                messages.map((message, i) => {
                  const isOutgoing = message.username === user.username
                  const isEditMode =
                    editMode && selectedMessage?.id === message.id
                  return (
                    <HStack
                      key={i}
                      width={'90%'}
                      bg={isOutgoing ? '#05e2e6' : '#a7ef72'} //receiver color bright green
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
                          {/* <VStack
                            alignItems={isOutgoing ? 'flex-end' : 'flex-start'}
                          > */}
                          <ThemedText
                            color={isOutgoing ? 'black' : 'black'}
                            fontSize={'md'}
                            text={`${message.username}: ${message.text}`}
                          />
                          {/* </VStack> */}
                          {/*isOutgoing && (
                            <HStack>
                              <Ionicons
                                name='create-outline'
                                size={20}
                                color='gray'
                                onPress={() => {
                                  setEditMode(true)
                                  setSelectedMessage(message)
                                }}
                              />
                              <Ionicons
                                name='trash-outline'
                                size={20}
                                color='gray'
                                onPress={() => {
                                  handleDeleteMessage(i)
                                  // <-- see if this outputs
                                  setMessages(
                                    messages.filter(
                                      msg =>
                                        message.text !== msg.text &&
                                        message.user !== msg.user
                                    )
                                  )
                                }}
                              />
                            </HStack>
                              )*/}
                        </>
                      )}
                    </HStack>
                  )
                })}
            </VStack>
          </ScrollView>

          <HStack>
            <Button
              w={20}
              style={[themeButtonStyle, { alignItems: 'center' }]}
              onPress={handleCameraImage}
            >
              <Ionicons name='camera-outline' size={24} color='white' />
            </Button>
            <Button
              w={20}
              onPress={handlePickImage}
              style={[themeButtonStyle, { alignItems: 'center' }]}
            >
              <Ionicons name='image-outline' size={24} color='white' />
            </Button>
          </HStack>

          {user?.username && (
            <VStack width={'100%'} style={{ flex: 1 }}>
              <HStack
                style={{
                  alignItems: 'center',
                  width: '100%',
                  paddingHorizontal: 10,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Input
                    ref={messageInputRef}
                    value={message}
                    style={themeContainerStyle}
                    onChangeText={setMessage}
                    placeholder='Send a message'
                    placeholderTextColor={colorScheme === 'light' ? 'black' : 'white'}
                    color={colorScheme === 'light' ? 'black' : 'white'}
                    returnKeyType="send"
                    onSubmitEditing={() => {
                      handleSubmit()
                    }}
                  />
                </View>
                {/* <Button
                  w={20}
                  style={[themeButtonStyle]}
                  mb='1'
                  colorScheme='cyan'
                  onPress={() => {
                    handleSubmit()
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  }}
                  disabled={!isValidRoom(room)}
                >
                  <Ionicons name='send-outline' size={25} color='white'></Ionicons>
                </Button> */}
              </HStack>
            </VStack>
          )}
        </ThemedBackground>
      </ThemedBox >
    </KeyboardAwareScrollView >
  )
}
