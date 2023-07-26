import { StyleSheet } from 'react-native'

export const colors = {
  background: '#ebf3fa',
  backgroundDark: '#ebf3fa',
  // backgroundDark: '#8aebff',
  backgroundDarker: '#02c1c4',
  // primary: '#00ffff',
  primary: '#05e2e6',
  secondary: '#5ff5cc',
  darkBackground: '#010e12', // greens: #0f2b1a  #092916  #022410
                            // blues: #1c2e4a  #082533  #01121a  
}

// coolors.co <-- get more styles
const blueGreen = {
  green1: '#D9ED92',
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  lightNav: {
    backgroundColor: colors.primary,
    color: '#ffffff',
  },
  darkNav: {
    backgroundColor: '#a7ef72',
    color: '#ffffff',
    fontSize: 'large',
    fontWeight: '600',
  },
  lightContainer: {
    backgroundColor: colors.backgroundDark,
  },
  llightContainer: {
    backgroundColor: colors.backgroundDarker,
  },
  darkContainer: {
    backgroundColor: colors.darkBackground,
  },
  lightThemeButton: {
    backgroundColor: colors.backgroundDarker,
  },
  darkThemeButton: {
    backgroundColor: colors.darkBackground,
  },
  lightThemeText: {
    color: '#333',
  },
  lightInput: {
    backgroundColor: colors.backgroundDark,
    color: 'black',
  },
  darkInput: {
    backgroundColor: colors.backgroundDark,
    color: 'white',
  },
  darkThemeText: {
    color: '#fff',
  },
})
