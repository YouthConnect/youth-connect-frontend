import React, { useContext, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import * as Location from 'expo-location';
import { AppContext } from '../contexts/AppContext';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const { setJournalEntries } = useContext(AppContext); // Get the setJournalEntries function from the AppContext

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      const savedImageUri = await savePhoto(photo);

      // Get the current date
      const currentDate = format(new Date(), 'yyyy-MM-dd');

      // Get the current location
      let location = null;
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const locationData = await Location.getCurrentPositionAsync({});
          location = `${locationData.coords.latitude}, ${locationData.coords.longitude}`;
        }
      } catch (error) {
        console.log('Error getting location:', error);
      }

      // Create a new entry object with the photo details, date, and location
      const newEntry = {
        title: 'New Entry',
        date: currentDate,
        location: location,
        imageUri: savedImageUri,
      };

      // Add the new entry to the context's journalEntries
      setJournalEntries((prevEntries) => [...prevEntries, newEntry]);

      navigation.navigate('EntryScreen', { entry: newEntry });
    }
  };

  const savePhoto = async (photo) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== 'granted') {
        throw new Error('Permission not granted to access media library');
      }

      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      const album = await MediaLibrary.getAlbumAsync('ExpoCameraApp');

      if (album == null) {
        await MediaLibrary.createAlbumAsync('ExpoCameraApp', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
      }

      alert('Photo saved to media library!');
      return asset.uri;
    } catch (error) {
      console.log(error);
      alert('Failed to save photo to media library.');
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCameraType}>
            <Text style={styles.buttonText}>Flip</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CameraScreen;