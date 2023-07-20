import React, { useContext } from 'react'
import { Box } from 'native-base'
import { ThemeContext } from '../App'
import { styles } from '../utils/styles'

export default function ThemedBox({ children }) {
  console.log('Children', children)
  const { themeContainerStyle } = useContext(ThemeContext);
  return (
    <Box style={[styles.container, themeContainerStyle]}>
      {children}
    </Box>
  );
}
