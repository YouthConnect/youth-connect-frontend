import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import NavBar from './components/NavBar'
import { StatusBar } from 'expo-status-bar'
import TabNav from './components/TabNav'


import { useColorScheme } from 'react-native'
import { useState, useEffect, createContext } from 'react'
import { bgImageDark, bgImageLight } from './utils/images'
import { styles } from './utils/styles'

import * as Haptics from 'expo-haptics'

export const ThemeContext = createContext()
export const UserContext = createContext()
export const ImageContext = createContext()
export function fetchRooms(setRooms) {
  try {
    fetch('https://youth-connect-server.onrender.com/api/v1/rooms')
      .then(res => res.json())
      .then(data => {
        setRooms(data)
      })
  } catch (err) {
    console.error('ERROR FETCHING ROOMS: ', err)
  }
}

/*(export function getAllMessages() {
    try {
      fetch(`https://youth-connect-server.onrender.com/api/v1/messages`)
        .then(res => res.json())
        .then(data => {
          let filteredMessages = data.filter(message => message.room === room)

          setMessages(filteredMessages)
        })
    } catch (err) {
      console.error('ERROR FETCHING MESSAGES: ', err)
    }
}*/

export default function App() {
  const [user, setUser] = useState(null)
  const [room, setRoom] = useState('none')
  const [rooms, setRooms] = useState([])
  const [bgImage, setBgImage] = useState()
  const [colorScheme, setColorScheme] = useState(useColorScheme())
  const [themeContainerStyle, setThemeContainerStyle] = useState()
  const [themeTextStyle, setThemeTextStyle] = useState()
  const [themeButtonStyle, setThemeButtonStyle] = useState()
  const [themeNavStyle, setThemeNavStyle] = useState()
  const [themeInputStyle, setThemeInputStyle] = useState()

  useEffect(() => {
    fetchRooms(setRooms)
  }, [])

  function setToDarkTheme() {
    setThemeContainerStyle(styles.darkContainer)
    setThemeTextStyle(styles.darkThemeText)
    setBgImage(bgImageDark)
    setColorScheme('dark')
    setThemeButtonStyle(styles.darkThemeButton)
    setThemeNavStyle(styles.darkNav)
    setThemeInputStyle(styles.darkInput)
  }

  function setToLightTheme() {
    setThemeContainerStyle(styles.lightContainer)
    setThemeTextStyle(styles.lightThemeText)
    setBgImage(bgImageLight)
    setColorScheme('light')
    setThemeButtonStyle(styles.lightThemeButton)
    setThemeNavStyle(styles.lightNav)
    setThemeInputStyle(styles.lightInput)
  }

  const toggleTheme = () => {
    colorScheme === 'dark' ? setToLightTheme() : setToDarkTheme()
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  useEffect(() => {
    colorScheme === 'dark' ? setToDarkTheme() : setToLightTheme()
  }, [colorScheme])

  return (
    <SafeAreaProvider style={{ paddingTop: 30, ...themeNavStyle }}>
      <StatusBar style='light' hidden={true} />
      <NavigationContainer>
        <NativeBaseProvider>
          <UserContext.Provider
            value={{ user, setUser, room, setRoom, rooms, setRooms }}
          >
            <ThemeContext.Provider
              value={{
                colorScheme,
                bgImage,
                toggleTheme,
                themeContainerStyle,
                themeTextStyle,
                themeInputStyle,
                themeNavStyle,
                themeButtonStyle,
              }}
            >
              <TabNav room={room} themeNavStyle={themeNavStyle} />
            </ThemeContext.Provider>
          </UserContext.Provider>
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
