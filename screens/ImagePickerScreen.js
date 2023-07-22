import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default function ImagePickerScreen() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePicker = () => {
    const options = {
      title: 'Select Image or Video',
      mediaType: 'mixed', // Allow both images and videos
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectedImage({ uri: response.uri });
        console.log('ImagePicker Response:', response);
      }
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {selectedImage && (
        <Image source={{ uri: selectedImage.uri }} style={{ width: 200, height: 200, marginBottom: 20 }} />
      )}
      <TouchableOpacity onPress={handleImagePicker} style={{ padding: 16, backgroundColor: 'lightblue' }}>
        <Text style={{ fontSize: 20, color: 'white' }}>Pick Image/Video</Text>
      </TouchableOpacity>
    </View>
  );
}
