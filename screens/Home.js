import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext, UserContext } from '../App'
import { Button, VStack } from 'native-base'
import { styles } from '../utils/styles'
import SignUpModal from '../components/SignUpModal'
import CreateRoomModal from '../components/CreateRoomModal';
import ThemedBox from '../components/ThemedBox'
import ThemedText from '../components/ThemedText'
import { View, Image } from 'react-native';
import ThemedBackground from '../components/ThemedBackground'
import LoginModal from '../components/LoginModal'
import RoomHB from '../components/RoomHB'
import ApproveUsersList from '../components/ApproveUsersList'
import LogoutButton from '../components/LogoutButton'

export default function HomeScreen({ navigation }) {
  const { toggleTheme, themeButtonStyle, colorScheme } = useContext(ThemeContext)
  const { user, room } = useContext(UserContext)
  // const imageUrl = 'https://lh3.googleusercontent.com/QwuhlOGkLP_n-YuhX16--yUdipYD9Wvce6RRW_Knovy8L8hGMPWlLe9O-cv1zIIixJnB';
  const imageUrl = colorScheme === 'light' ? 'https://github.com/EvaGraceSmith/chat/blob/fc760237fb4cfbcb4412634cc621c9ba22e1aecc/assets/TransparentLogo.png?raw=true' : 'https://github.com/EvaGraceSmith/chat/blob/main/assets/TransparentLogoDark.png?raw=true' ;

  return (
    <ThemedBox container={true} testID='HOME'>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: -40 }}>
        <Image source={{ uri: imageUrl }} style={{ width: 400, height: 400, alt: 'Youth connect logo' }} />
      </View>



      <ThemedBackground style={{ marginTop: -40 }}>
        {/* <ThemedText
          mb={10}
          textAlign={'center'}
          fontSize='xl'
          testID={'HOME TITLE'}
          text={`Welcome to Youth Connect! ${user && user.username !== 'null' ? user.username : ''
            }`}
        /> */}

        {user && user.role === 'admin' &&
          <>
            <ApproveUsersList />
            <CreateRoomModal />
          </>
        }

        <VStack space={4} alignItems='center'>
          {user?.username ? (
            ''
          ) : (
            <>
              <LoginModal />
              <SignUpModal />
            </>
          )}


          {user?.username &&
            <>
              <RoomHB />
              <LogoutButton />
            </>}

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
