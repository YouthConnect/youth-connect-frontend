import React, { useContext } from 'react'
import { Box } from 'native-base'
import { ThemeContext } from '../App'
import { styles } from '../utils/styles'

export default function ThemedBox({ safeArea, container, p, py, w, maxW, children }) {
  
  const { themeContainerStyle } = useContext(ThemeContext);
  return (
    <Box p={p} py={py} w={w} maxW={maxW} style={[container && styles.container, themeContainerStyle]} safeArea={safeArea}>
      {children}
    </Box>
  );
}
