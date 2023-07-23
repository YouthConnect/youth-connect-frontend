import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import TabNav from './components/TabNav'

import { useColorScheme } from 'react-native'
import { useState, useEffect, createContext } from 'react'
import { bgImageDark, bgImageLight } from './utils/images'
import { styles } from './utils/styles'

import * as Haptics from 'expo-haptics'

export const ThemeContext = createContext()
export const UserContext = createContext()

export function fetchRooms(setRooms) {
  try {
    fetch('https://youth-connect-backend.onrender.com/api/v1/rooms')
      .then(res => res.json())
      .then(data => {
        setRooms(data)
      })
  } catch (err) {
    console.error('ERROR FETCHING ROOMS: ', err)
  }
}

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
  const [pickedImagePath, setPickedImagePath] = useState()

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

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  }

  return (
    <SafeAreaProvider
      style={{ paddingTop: 40, ...themeNavStyle }}
      initialMetrics={inset}
    >
      <StatusBar style='dark' hidden={false} />
      <NavigationContainer>
        <NativeBaseProvider initialWindowMetrics={inset}>
          <UserContext.Provider
            value={{
              user,
              setUser,
              room,
              setRoom,
              rooms,
              setRooms,
              pickedImagePath,
              setPickedImagePath,
            }}
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
              <TabNav user={user} room={room} themeNavStyle={themeNavStyle} />
            </ThemeContext.Provider>
          </UserContext.Provider>
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
