import { useContext } from 'react'
import { Box, Text, Button, VStack } from 'native-base'
import { ImageBackground } from 'react-native'
import { ThemeContext, UserContext } from '../App'

import { styles } from '../utils/styles'

export default function HomeScreen({ navigation }) {
  const { colorScheme, bgImage, toggleTheme } = useContext(ThemeContext)
  const { user } = useContext(UserContext)

  let themeContainerStyle
  let themeTextStyle

  if (colorScheme === 'dark') {
    themeContainerStyle = styles.darkContainer
    themeTextStyle = styles.darkThemeText
  } else {
    themeContainerStyle = styles.lightContainer
    themeTextStyle = styles.lightThemeText
  }

  return (
    <Box style={[styles.container, themeContainerStyle]}>
      <ImageBackground
        source={bgImage}
        resizeMode='cover'
        style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
      >
        <Text mb={10} style={themeTextStyle} textAlign={'center'} fontSize='xl'>
          Welcome to Youth Connect! {user && user.username}
        </Text>

        <VStack space={4} alignItems='center'>
          <Button width='105px' onPress={() => navigation.navigate('Login')}>
            Log In
          </Button>

          <Button onPress={() => navigation.navigate('Rooms')}>
            Join a room
          </Button>

          <Button mt={10} size={'sm'} onPress={toggleTheme}>
            Change Theme
          </Button>
        </VStack>
      </ImageBackground>
    </Box>
  )
}
