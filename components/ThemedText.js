import React, { useContext } from 'react'
import { Text } from 'native-base'
import { ThemeContext } from '../App'
import { styles } from '../utils/styles'
import { fonts} from '../utils/fonts'

export default function ThemedText(text) {
  const { themeStyles } = useContext(ThemeContext);
  return (
    <Text style={[styles.themeTextStyle, themeStyles]}>
{text}
    </Text>
  );
}