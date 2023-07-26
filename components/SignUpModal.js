import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  Alert,
  Text,
} from 'native-base'
import React, { useState, useContext } from 'react'
import { UserContext, ThemeContext } from '../App'
import { styles, colors } from '../utils/styles'
import { useRef } from 'react'
import { Platform, KeyboardAvoidingView, View } from 'react-native'

const SignUpModal = ({ visible, onClose }) => {
  const passwordRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const { colorScheme, themeInputStyle, themeTextStyle, themeButtonStyle, themeContainerStyle } =
    useContext(ThemeContext)

  const handleSubmit = async () => {
    // Perform validation, e.g., check if the fields are not empty
    if (!username || !password) {
      setAlert(true)
      return
    }
    console.log('username password', username, password)

    const method = 'POST'
    const url = 'https://youth-connect-backend.onrender.com/signup'
    const action = 'CREATING USER'
    let headers = new Headers()
    const body = {
      username: username,
      password: password,
      DOB: '12/01/1090',
    }
    // Basic auth only
    // let user = base64.encode(`${username}:${password}`);
    // Bearer auth only
    // headers.set("Authorization", `Bearer ${user.token}`);
    // all posts and puts and delete
    headers.set('Content-Type', 'application/json')

    try {
      fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      })
        .then(res => res.json())
        .then(data => {
          console.log('data', data)
          setUser(data.user)
        })
    } catch (error) {
      console.log('ERROR ', action, ':', error)
    }
    setShowModal(false)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <Center
          // style={
          //   colorScheme === 'light'
          //     ? { backgroundColor: 'white' }
          //     : styles.llightContainer
          // }
          style={[themeContainerStyle]}
        >
          <Button
          style={[themeButtonStyle]}
          onPress={() => setShowModal(true)}>
            Sign Up
          </Button>
          <Modal
            // style={{
            //   backgroundColor:
            //     colorScheme === 'light' ? 'white' : colors.backgroundDarker,
            //   // position: 'absolute',
            // }}
            style={themeContainerStyle}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          >
            <Modal.Content maxWidth='400px'>
              <Modal.CloseButton />
              <Modal.Header>Sign Up For Youth Connect</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label>Username</FormControl.Label>
                  <Input
                    onChangeText={setUsername}
                    returnKeyType='next'
                    onSubmitEditing={() => {
                      passwordRef.current.focus()
                    }}
                  />
                </FormControl>
                <FormControl mt='3'>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    ref={passwordRef}
                    type='password'
                    onChangeText={setPassword}
                    returnKeyType='send'
                    onSubmitEditing={() => {
                      handleSubmit()
                    }}
                  />
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant='ghost'
                    colorScheme='blueGray'
                    onPress={() => {
                      setShowModal(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onPress={() => {
                      handleSubmit()
                    }}
                  >
                    Submit
                  </Button>
                  {alert && (
                    <Alert variant='subtle' status='error' mt={2}>
                      <Text>Error, Please enter all required fields</Text>
                    </Alert>
                  )}
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Center>
    </KeyboardAvoidingView>
  )
}


export default SignUpModal
