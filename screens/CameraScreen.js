import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Image,
  StyleSheet
} from 'react-native';
import { Box, Input } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import socket from '../utils/socket'

//const [pickedImagePath, setPickedImagePath] = useState('');

const CameraScreen = () => {

  const handleCameraImage = async () => {
    

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Sorry, we need camera  permissions to make this work!');
      return;
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // setImage(result);
      //setPickedImagePath(result.uri);
      const payload = {
        text: result.uri,
        room: room,
        username: user.username,
      }
  
      socket.emit('MESSAGE', payload)
    }
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // setImage(result);
      setPickedImagePath(result.uri);
      const payload = {
        text: "photo taken"+result.uri,
        room: room,
        username: user.username,
      }
      socket.emit('MESSAGE', payload)
    }
  };

  return (
    <View>
      <View>
          <Button
            onPress={handleCameraImage}
            color="orange"
            title="Take Picture" />
          <Button
            onPress={handlePickImage}
            color="blue"
            title="Select Image" />
        </View>
      </View>
  )

};

export default CameraScreen;