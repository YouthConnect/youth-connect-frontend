import React from 'react';
import { View,Box, Button } from 'react-native';
// import ImagePicker from 'react-native-image-picker';

export default function CameraScreen() {
  const handleOpenCamera = () => {
    const options = {
      mediaType: 'photo', // Change this to 'video' if you want to record videos
      quality: 1, // Change the quality of the image (0 to 1)
    };

    ImagePicker.launchCamera(options, (response) => {
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

  return (
    <Box
          safeArea
          p='2'
          py='20'
          w='90%'
          maxW='290'
        >
      {/* <Button title="Open Camera" onPress={handleOpenCamera} /> */}
    </Box>
  );
}
