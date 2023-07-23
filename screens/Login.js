import {
  Box,
  FormControl,
  Input,
  Center,
  Heading,
  VStack,
  Button,
} from 'native-base';

import { ThemeContext, UserContext } from '../App';

import React, { useContext, useState } from 'react';

import base64 from 'base-64';
import ThemedBackground from '../components/ThemedBackground';

export default function Login({ navigation }) {
  const { themeInputStyle, themeTextStyle, themeButtonStyle } =
    useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

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
          console.log('login success');
          setUser(data.user);
          navigation.navigate('Home');
        });
    } catch (error) {
      console.log('ERROR SIGNING IN: ', error);
    }
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ThemedBackground>
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
                style={themeInputStyle}
                onChangeText={setUsername}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>

              <Input
                style={themeInputStyle}
                type='password'
                onChangeText={setPassword}
              />
            </FormControl>
            <Button
              mt='2'
              style={[themeButtonStyle]}
              onPress={handleSubmit}
              disabled={user?.username ? true : false}
            >
              Sign in
            </Button>
          </VStack>
        </Box>
      </Center>
    </ThemedBackground>
  );
}
