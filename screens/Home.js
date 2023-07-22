import React, { useContext, useState } from 'react';
import { ThemeContext, UserContext } from '../App';
import { Button, VStack } from 'native-base';
import { styles } from '../utils/styles';
import SignUpModal from '../components/SignUpModal';
import ThemedBox from '../components/ThemedBox';
import ThemedText from '../components/ThemedText'
import ThemedButton from '../components/ThemedButton';
import ThemedBackground from '../components/ThemedBackground';

export default function HomeScreen({ navigation }) {
  const { colorScheme, bgImage, toggleTheme, themeContainerStyle, themeTextStyle, themeButtonStyle } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  return (
    <ThemedBox container={true}>

      <ThemedBackground
      >
        <ThemedText mb={10} textAlign={'center'} fontSize='xl' text={`Welcome to Youth Connect! ${user && user.username}`}  />
        {/* <Text mb={10} style={themeTextStyle} textAlign={'center'} fontSize='xl'>
          Welcome to Youth Connect! {user && user.username}
        </Text> */}

        <VStack space={4} alignItems='center'>
          <SignUpModal />
         
            <Button style={[themeButtonStyle]} onPress={() => navigation.navigate('Login')}>
              Log In
            </Button>
          

          <Button style={[themeButtonStyle]} onPress={()=> navigation.navigate('Rooms')}>
            Join a room
          </Button>

          <Button style={[themeButtonStyle]} mt={10} size={'sm'} onPress={toggleTheme}>
            Change Theme
          </Button>
          
        </VStack>
      </ ThemedBackground>
    </ThemedBox>
  );
}

