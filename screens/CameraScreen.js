import React, { useEffect, useLayoutEffect, useState, useContext } from 'react'
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
import { UserContext } from '../App'



const CameraScreen = () => {
  const testimage = "https://i.imgur.com/2nCt3Sbl.jpg"
const [pickedImagePath, setPickedImagePath] = useState('');
  const { user, room } = useContext(UserContext);
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
      setPickedImagePath(result.uri);
      //alert("picture uri"+ result.uri);
      const payload = {
        text: "Image " +result.uri,
        room: room,
        username: user.username,
      }
     // alert(payload);
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
        text: "Image "+result.uri,
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
            <Image source = {{uri:pickedImagePath?pickedImagePath:testimage}}
   style = {{ width: 200, height: 200 }}
   />
        </View>
      </View>
  )

};

export default CameraScreen;
