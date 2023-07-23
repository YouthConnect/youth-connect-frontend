import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext, UserContext } from '../App'
import { Button, VStack } from 'native-base'
import { styles } from '../utils/styles'
import SignUpModal from '../components/SignUpModal'
import ThemedBox from '../components/ThemedBox'
import ThemedText from '../components/ThemedText'

import ThemedBackground from '../components/ThemedBackground'
import LoginModal from '../components/LoginModal'
import RoomHB from '../components/RoomHB'

export default function HomeScreen({ navigation }) {
  const { toggleTheme, themeButtonStyle } = useContext(ThemeContext)
  const { user, room } = useContext(UserContext)

  return (
    <ThemedBox container={true} testID='HOME'>
      <ThemedBackground>
        <ThemedText
          mb={10}
          textAlign={'center'}
          fontSize='xl'
          testID={'HOME TITLE'}
          text={`Welcome to Youth Connect! ${
            user && user.username !== 'null' ? user.username : ''
          }`}
        />

        <VStack space={4} alignItems='center'>
          {user?.username ? (
            ''
          ) : (
            <>
              <LoginModal />
              <SignUpModal />
            </>
          )}

          {user?.username && <RoomHB />}

          <Button
            style={[themeButtonStyle]}
            mt={10}
            size={'sm'}
            onPress={toggleTheme}
          >
            Change Theme
          </Button>
        </VStack>
      </ThemedBackground>
    </ThemedBox>
  )
}
