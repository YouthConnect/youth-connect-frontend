import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import TabNav from './components/TabNav'
import { StatusBar } from 'expo-status-bar'

import { useColorScheme } from 'react-native'  
import { useState, createContext } from 'react'
import { bgImageDark, bgImageLight } from './utils/images'

import * as Haptics from 'expo-haptics'

export const ThemeContext = createContext()
export const UserContext = createContext()

export default function App() {
  const [user, setUser] = useState({username: 'name'})
  const [room, setRoom] = useState('none')
  const [colorScheme, setColorScheme] = useState(useColorScheme())
  const [themeContainerStyle, setThemeContainerStyle] = useState()
  const [themeTextStyle, setThemeTextStyle] = useState();
  const [bgImage, setBgImage] = useState(
    useColorScheme() === 'dark' ? bgImageDark : bgImageLight
  )

  const toggleTheme = () => {
    // colorScheme === 'dark' ? setToLightTheme() : setToDarkTheme()
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
    setBgImage(colorScheme === 'dark' ? bgImageLight : bgImageDark)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  // let themeContainerStyle
  // let themeTextStyle

  function setToDarkTheme(){
    setThemeContainerStyle(styles.darkContainer)
    setThemeTextStyle(styles.darkThemeText)
  };

  function setToLightTheme(){
    setThemeContainerStyle(styles.lightContainer)
    setThemeTextStyle(styles.lightThemeText)
  }

  return (
    <SafeAreaProvider>
      <StatusBar style='light' hidden={true} />
      <NavigationContainer>
        <NativeBaseProvider>
          <UserContext.Provider value={{ user, setUser, room, setRoom }}>
            <ThemeContext.Provider
              value={{ colorScheme, bgImage, toggleTheme, themeContainerStyle, themeTextStyle }}
            >
              <TabNav colorScheme={colorScheme} />
            </ThemeContext.Provider>
          </UserContext.Provider>
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
