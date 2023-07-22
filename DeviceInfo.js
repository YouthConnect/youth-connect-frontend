import React from 'react';
import { View, Text } from 'react-native';
import Constants from 'expo-constants';

const DeviceInfo = () => {
  return (
    <View>
      <Text>Device Name: {Constants.deviceName}</Text>
      <Text>Platform: {Constants.platform.os}</Text>
      <Text>Is Device: {Constants.isDevice ? 'Yes' : 'No'}</Text>
      <Text>Device ID: {Constants.deviceId}</Text>
      <Text>Expo Version: {Constants.expoVersion}</Text>
    </View>
  );
}

export default DeviceInfo;
