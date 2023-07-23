import React, { useContext } from 'react';
import { Box } from 'native-base';
import { ThemeContext } from '../App';
import { styles } from '../utils/styles';

export default function ThemedBox({
  testID,
  safeArea,
  container,
  p,
  py,
  w,
  maxW,
  testStyle,
  children,
}) {
  const { themeContainerStyle } = useContext(ThemeContext);
  return (
    <Box
      p={p}
      py={py}
      w={w}
      maxW={maxW}
      testID={testID}
      style={
        testStyle
          ? testStyle
          : [container && styles.container, themeContainerStyle]
      }
      safeArea={safeArea}
    >
      {children}
    </Box>
  );
}
