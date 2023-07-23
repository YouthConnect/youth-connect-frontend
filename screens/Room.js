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
  Menu
} from 'native-base'

import { Platform } from 'react-native'

import React, { useEffect, useLayoutEffect, useState, useContext } from 'react'
import ThemedBox from '../components/ThemedBox'

import * as Haptics from 'expo-haptics'

import { colors, styles } from '../utils/styles'
import { UserContext, ThemeContext} from '../App'
import socket from '../utils/socket'
import ThemedText from '../components/ThemedText'
import ThemedBackground from '../components/ThemedBackground'

export default function Room({ route, navigation }) {
  const {
    colorScheme,
    bgImage,
    themeButtonStyle,
    themeContainerStyle,
    themeTextStyle,
  } = useContext(ThemeContext)
  const { user, room, setRoom,pickedImagePath } = useContext(UserContext)




  const handleSubmit = () => {
    const payload = {
      text: message,
      room: room,
      username: user.username,
    }

    socket.emit('MESSAGE', payload)
    setMessages([...messages, payload])
    setMessage('')
  }
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const testimage = "https://i.imgur.com/2nCt3Sbl.jpg"
  useEffect(() => {
    socket.emit('GET RECENT MESSAGES', room)
  }, [room])


  const addNewMessage = message => {
    console.log('NEW MESSAGE', message)
    setMessages([...messages, message])
  }

  const isValidRoom = room => {
    let valid = room !== 'none' && room !== null && room !== undefined
    return valid
  }

  const isValidHttpUrl = (str) => {
    // alert("Image " + str)

    if (str.includes('Image')){
      str.trimLeft("Image ")
      // alert("Image " + testimage)
       return true;
    }
    else
      return false;

    


    // const pattern = new RegExp(
    //   '^([a-zA-Z]+:\\/\\/)?' + // protocol
    //   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    //   '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
    //   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    //   '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    //   '(\\#[-a-z\\d_]*)?$', // fragment locator
    //   'i'
    // );
    // return pattern.test(str);
  }

  useEffect(() => {
    try {
      socket.on('NEW MESSAGE', payload => {
        addNewMessage(payload)
      })
    } catch (error) {
      console.error('ERROR RECEIVING MESSAGE', error)
    }

    try {
      socket.on('SENDING RECENT MESSAGES', payload => {
        setMessages(payload)
      })
    } catch (error) {
      console.error('ERROR RECEIVING RECENT MESSAGES', error)
    }
  }, [socket])

  return (
    <ThemedBox container={true} safeArea={true}>
      <ThemedBackground source={bgImage} resizeMode='cover' style={{ flex: 1 }}>
        <Box flex={1} mt={15} p={3}>
          {!isValidRoom(room) &&
            <ThemedText
              style={themeTextStyle}
              textAlign={'center'}
              fontSize={'lg'}
              text={'Please join a room'}
            ></ThemedText>
          }

          {isValidRoom(room) && (
            <Button
              size={'sm'}
              style={[themeButtonStyle]}
              onPress={() => {
                setMessages([])
                setRoom('none')
                navigation.navigate('Rooms')
              }}
            >
              Leave
            </Button>
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
                  return (
                    <>
                      <Center
                        key={i}
                        w='80'
                        bg={colorScheme === 'light'
                          ? colors.backgroundDark
                          : colors.darkBackground}
                        rounded='md'
                        shadow={3}
                      >
                        {isValidHttpUrl(message.text) ? (
                          <Image source = {{uri:pickedImagePath}}
   style = {{ width: 200, height: 200 }} />
                        ) : (
                          <ThemedText
                            style={themeTextStyle}
                            fontSize={'md'}
                            text={`${message.username}: ${message.text}`}
                          ></ThemedText>
                        )}
                      </Center></>
                  )
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
                handleSubmit()
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              }}
              disabled={!isValidRoom(room)}
            >
              Send
            </Button>
            <Button onPress={() => navigation.navigate('Camera')}>
              Camera
            </Button>
          </VStack>
        )}
      </ThemedBackground>
    </ThemedBox>
  )
}
