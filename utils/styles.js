import { StyleSheet } from 'react-native'

export const colors = {
  background: '#ebf3fa',
  backgroundDark: '#ebf3fa',
  // backgroundDark: '#8aebff',
  backgroundDarker: '#88acff',
  primary: '#00ffff',
  secondary: '#5ff5cc',
  darkBackground: '#5aa5aa',
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
  },
  darkNav: {
    backgroundColor: colors.secondary,
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
    color: 'black',
  },
  darkThemeText: {
    color: '#fff',
  },
})
