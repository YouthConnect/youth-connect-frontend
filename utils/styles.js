import { StyleSheet } from 'react-native'

export const colors = {
  background: '#B7DEFF',
  backgroundDark: '#8aebff',
  backgroundDarker: '#88acff',
  primary: '#00ffff',
  secondary: '#5ff5cc',
  darkBackground: '#5aa5aa',
}

const blueGreen = {
  green1: '#D9ED92'
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
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
  lightThemeText: {
    color: '#333',
  },
  darkThemeText: {
    color: '#fff',
  },
})
