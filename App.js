import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import TabNav from './components/TabNav'
import { StatusBar } from 'expo-status-bar'

import { useColorScheme } from 'react-native'  
import { useState, useEffect, createContext } from 'react'
import { bgImageDark, bgImageLight } from './utils/images'
import { styles } from './utils/styles'

import * as Haptics from 'expo-haptics'

export const ThemeContext = createContext()
export const UserContext = createContext()

export default function App() {
  
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState('none');
  const [colorScheme, setColorScheme] = useState(useColorScheme());
  const [themeContainerStyle, setThemeContainerStyle] = useState();
  const [themeTextStyle, setThemeTextStyle] = useState();
  const [bgImage, setBgImage] = useState();
  const [themeButtonStyle, setThemeButtonStyle] = useState();

  function setToDarkTheme(){
    setThemeContainerStyle(styles.darkContainer)
    setThemeTextStyle(styles.darkThemeText)
    setBgImage(bgImageDark)
    setColorScheme('dark')
    setThemeButtonStyle(styles.darkThemeButton)
  };

  function setToLightTheme(){
    setThemeContainerStyle(styles.lightContainer)
    setThemeTextStyle(styles.lightThemeText)
    setBgImage(bgImageLight)
    setColorScheme('light')
    setThemeButtonStyle(styles.lightThemeButton)
  }

  const toggleTheme = () => {
    colorScheme === 'dark' ? setToLightTheme() : setToDarkTheme()
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  useEffect(() => {
    colorScheme === 'dark' ? setToDarkTheme() : setToLightTheme()
  }, [colorScheme])



  return (
    <SafeAreaProvider>
      <StatusBar style='light' hidden={true} />
      <NavigationContainer>
        <NativeBaseProvider>
          <UserContext.Provider value={{ user, setUser, room, setRoom }}>
            <ThemeContext.Provider
               value={{ colorScheme, bgImage, toggleTheme, themeContainerStyle, themeTextStyle, themeButtonStyle }}
              
            > 
              <TabNav colorScheme={colorScheme} />
            </ThemeContext.Provider>
          </UserContext.Provider>
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
