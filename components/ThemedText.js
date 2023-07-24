import React, { useContext } from 'react'
import { Text } from 'native-base'
import { ThemeContext } from '../App'
import { styles } from '../utils/styles'
import { fonts } from '../utils/fonts'

export default function ThemedText({
  testID,
  text,
  testStyle,
  fontSize,
  textAlign,
  mb,
  mt,
  children,
}) {
  const { themeTextStyle } = useContext(ThemeContext)

  return (
    <Text
      mb={mb}
      mt={mt}
      textAlign={textAlign}
      fontSize={fontSize}
      testID={testID}
      style={testStyle ? testStyle : [styles.themeTextStyle, themeTextStyle]}
    >
      {text} {children}
    </Text>
  )
}
