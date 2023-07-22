import React, { useContext } from 'react'
import { Button } from 'native-base'
import { ThemeContext } from '../App'
import { styles } from '../utils/styles'

export default function ThemedButton({ children }) {
  console.log('Children', children)
  const { themeContainerStyle } = useContext(ThemeContext);
  return (
    <Button 
    size={'sm'}
    style={[styles.container, themeContainerStyle]}>
      {children}
    </Button>
  );
}