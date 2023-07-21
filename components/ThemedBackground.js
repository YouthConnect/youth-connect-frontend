import React, { useContext } from 'react';
import { ImageBackground } from 'react-native';
import { ThemeContext } from '../App';
import { styles } from '../utils/styles';

export default function ThemedBackground({ children }) {
  const { bgImage, themeContainerStyle } = useContext(ThemeContext);

  return (
    <ImageBackground
      source={bgImage}
      resizeMode='cover'
      style={[styles.container, themeContainerStyle, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}
    >
      {children}
    </ImageBackground>
  );
}
