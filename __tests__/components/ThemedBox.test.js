import React from 'react';

import { render, screen } from '@testing-library/react-native';

import ThemedBox from '../../components/ThemedBox';
import { Themed } from 'react-navigation';
import { NativeBaseProvider, Text } from 'native-base';
import { ThemeContext } from '../../App';
import { styles } from '../../utils/styles';

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('<ThemedBox />', () => {
  const themeContainerStyle = styles.darkContainer;
  const backgroundColor = Object.values(styles.darkContainer)[0];

  it('renders', async () => {
    render(
      <ThemeContext.Provider value={themeContainerStyle}>
        <NativeBaseProvider initialWindowMetrics={inset}>
          <ThemedBox testID='BOX'></ThemedBox>
        </NativeBaseProvider>
      </ThemeContext.Provider>
    );

    let box = await screen.findByTestId('BOX');
    expect(box).toBeDefined();
  });

  it('renders children and theme', async () => {
    render(
      <ThemeContext.Provider value={themeContainerStyle}>
        <NativeBaseProvider initialWindowMetrics={inset}>
          <ThemedBox
            testStyle={themeContainerStyle}
            testID='BOX'
          >
            <Text>Hi!</Text>
          </ThemedBox>
        </NativeBaseProvider>
      </ThemeContext.Provider>
    );
    let box = await screen.findByTestId('BOX');
    expect(box).toBeDefined();
    //console.log(box.props.style[1]);
    expect(box.props.style[1].backgroundColor).toBe(`${backgroundColor}`);
    let child = await screen.findByText('Hi!');
    expect(child).toBeDefined();
  });
});
