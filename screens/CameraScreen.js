import React, { useContext } from 'react'
import { View, Button, Image } from 'react-native'
import { Box, Input } from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import socket from '../utils/socket'
import { UserContext } from '../App'
import { FileSystem } from 'expo-file-system'

const CameraScreen = () => {
  const testimage = 'https://i.imgur.com/2nCt3Sbl.jpg'
  const { user, room, pickedImagePath, setPickedImagePath } =
    useContext(UserContext)
  const handleCameraImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    if (permissionResult.granted === false) {
      alert('Sorry, we need camera  permissions to make this work!')
      return
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
      return
    }

    // have we verified the format?
    // 
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true, //this is what we want to send to the socket server
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    // console.log('result' , result);
    // console.log ('object.keys', Object.keys(result));

    if (!result.canceled) {

      const displayedImage = result.assets[0];
      // setImage(result);
      setPickedImagePath(result.assets[0].uri) //we want to send base64, not uri

      //const fsImage = await FileSystem.readAsStringAsync(result.assets[0].uri, {})
      //console.log('FILE SYSTEM image:', fsImage)
      //alert("picture uri"+ displayedImage);
      /*const payload = {
        // if ios something, if android result.uri
        text: 'Image ',
        room: room,
        username: user.username,
        isImage: true,
        image: result.assets[0].base64,
      }*/

      const payload = { 
        text: "Image " + result.assets[0].uri,
        room: room,
        username: user.username,
        isImage: true
      }
      // alert(payload);
      socket.emit('MESSAGE', payload)
    }
  }

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      // setImage(result);
      setPickedImagePath(result.assets.uri)

      // JS file-like object
      //var blob = new Blob ([fileBody], { type: 'text/xml' });
      //let results = await axios.post('https://upload.box.com/api/2.0/files/content');

      // create the image blob
      /*
      imagePayload = {
        image: result.assets,
        username: user.username,
        room: room,
        isImage: true,
      }
      */

      //socket.emit('MESSAGE', imagePayload)

      //then server creates image - and emits (TO EVERYONE) "NEW IMAGE"

      
      const payload = {
        text: "Image "+result.uri,
        room: room,
        username: user.username,
        isImage: true
      }
      socket.emit('MESSAGE', payload)
    }
  }

  return (
    <View>
      <View>
        <Button
          onPress={handleCameraImage}
          color='orange'
          title='Take Picture'
        />
        <Button onPress={handlePickImage} color='blue' title='Select Image' />
        <Image
          source={{ uri: pickedImagePath ? pickedImagePath : testimage }}
          style={{ width: 200, height: 200 }}
        />
      </View>
    </View>
  )
}

export default CameraScreen
