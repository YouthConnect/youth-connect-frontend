import React, { useContext, useState } from 'react';
import { ThemeContext, UserContext } from '../App';
import ThemedBox from '../components/ThemedBox';
import { Text, Button, VStack, Box } from 'native-base';
import { ImageBackground } from 'react-native';
import { styles } from '../utils/styles';
import SignUpModal from '../components/SignUpModal';

export default function HomeScreen({ navigation }) {
  const { colorScheme, bgImage, toggleTheme, themeContainerStyle, themeTextStyle } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  const [modalVisible, setModalVisible] = useState(false)

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
          <SignUpModal />
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
  );
}

