import React, { useContext } from 'react';
import { ThemeContext, UserContext } from '../App';
import ThemedBox from '../components/ThemedBox';
import { Text, Button, VStack, Box } from 'native-base';
import { ImageBackground } from 'react-native';
import { styles } from '../utils/styles'
import ThemedText from '../components/ThemedText'
import ImagePickerScreen from './ImagePickerScreen';
import ImagePicker from 'react-native-image-picker';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker'

  const handleOpenCamera = () => {
    const options = {
      mediaType: 'photo', // Change this to 'video' if you want to record videos
      quality: 1, // Change the quality of the image (0 to 1)
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        // User cancelled the action
      } else if (response.error) {
        // Error occurred
      } else {
        // Image/Video successfully captured
        console.log('Image/Video:', response);
        // Do something with the captured media (e.g., display it on the screen)
      }
    });
  };
export default function HomeScreen({ navigation }) {
  const { colorScheme, bgImage, toggleTheme, themeContainerStyle, themeTextStyle } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  return (
    <Box style={[styles.container, themeContainerStyle]}>
      <ImageBackground
        source={bgImage}
        resizeMode='cover'
        style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
      >
        <ThemedText mb={10} textAlign={'center'} fontSize='xl' text={`Welcome to Youth Connect! ${user && user.username}`}  />
        {/* <Text mb={10} style={themeTextStyle} textAlign={'center'} fontSize='xl'>
          Welcome to Youth Connect! {user && user.username}
        </Text> */}

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
          <Button title="Open Camera" onPress={handleOpenCamera}> Camera 
            </Button> 
        </VStack>
      </ImageBackground>
    </Box>
  );
}

