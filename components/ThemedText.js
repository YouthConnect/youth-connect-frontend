import React, { useContext } from 'react'
import { Text } from 'native-base'
import { ThemeContext } from '../App'
import { styles } from '../utils/styles'
import { fonts} from '../utils/fonts'


export default function ThemedText({ text, fontSize, textAlign, mb, mt}) {
  const { themeTextStyle } = useContext(ThemeContext);

  return (
    <Text mb={mb} mt={mt} textAlign={textAlign} fontSize={fontSize} style={[styles.themeTextStyle, themeTextStyle]}>
      {text}
    </Text>
  );
}
