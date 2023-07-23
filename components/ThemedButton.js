import React, { useContext } from 'react';
import { Button } from 'native-base';
import { ThemeContext } from '../App';
import { styles } from '../utils/styles';

export default function ThemedButton({
  testID,
  mt,
  w,
  size,
  width,
  disabled,
  colorScheme,
  children,
}) {
  const { themeButtonStyle } = useContext(ThemeContext);
  return (
    <Button
      mt={mt}
      w={w}
      size={size}
      width={width}
      disabled={disabled}
      colorScheme={colorScheme}
      style={[themeButtonStyle]}
      testID={testID}
    >
      {children}
    </Button>
  );
}
