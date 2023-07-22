import React, { useContext } from 'react'
import { Text } from 'native-base'
import { ThemeContext } from '../App'
import { styles } from '../utils/styles'
import { fonts} from '../utils/fonts'


export default function ThemedText({ text, fontSize, textAlign, mb}) {
  const { themeTextStyle } = useContext(ThemeContext);

  return (
    <Text mb={mb} textAlign={textAlign} fontSize={fontSize} style={[styles.themeTextStyle, themeTextStyle]}>
      {text}
    </Text>
  );
}
