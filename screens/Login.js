import {
  Box,
  FormControl,
  Input,
  Center,
  Heading,
  VStack,
  Button,
} from 'native-base';

import { ImageBackground } from 'react-native';
import { ThemeContext, UserContext } from '../App';

import React, { useContext, useState } from 'react';
import { colors, styles } from '../utils/styles';

import base64 from 'base-64';

export default function Login() {
  const { colorScheme, bgImage } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

  let themeContainerStyle;
  let themeTextStyle;

  if (colorScheme === 'dark') {
    themeContainerStyle = styles.darkContainer;
    themeTextStyle = styles.darkThemeText;
  } else {
    themeContainerStyle = styles.lightContainer;
    themeTextStyle = styles.lightThemeText;
  }

  const handleSubmit = e => {
    e.preventDefault();

    try {
      let headers = new Headers();
      let user = base64.encode(`${username}:${password}`);
      headers.set('Authorization', `Basic ${user}`);
      fetch('https://youth-connect-backend.onrender.com/signin', {
        method: 'POST',
        headers: headers,
      })
        .then(res => res.json())
        .then(data => {
          setUser(data.user);
        })
        .catch(err => console.error(err));
    } catch (error) {
      console.log('ERROR SIGNING IN: ', error);
    }
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground
      source={bgImage}
      resizeMode='cover'
      style={{ flex: 1, ...themeContainerStyle }}
    >
      <Center w='100%'>
        <Box
          safeArea
          p='2'
          py='20'
          w='90%'
          maxW='290'
        >
          <Heading
            mt='1'
            style={themeTextStyle}
            fontWeight='medium'
            size='xs'
          >
            {user?.username
              ? `You're all set ${user?.username}`
              : 'Sign in to continue!'}
          </Heading>

          <VStack
            space={3}
            mt='5'
          >
            <FormControl>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                style={styles.darkContainer}
                onChangeText={setUsername}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                style={styles.darkContainer}
                type='password'
                onChangeText={setPassword}
              />
            </FormControl>
            <Button
              mt='2'
              colorScheme='cyan'
              onPress={handleSubmit}
              disabled={user?.username ? true : false}
            >
              Sign in
            </Button>
          </VStack>
        </Box>
      </Center>
    </ImageBackground>
  );
}
