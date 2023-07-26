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
import base64 from 'base-64'
import { useRef } from 'react' //
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const LoginModal = ({ visible, onClose }) => {
  const passwordRef = useRef(null) //
  const [showModal, setShowModal] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const {
    themeInputStyle,
    themeContainerStyle,

    themeButtonStyle,
  } = useContext(ThemeContext)

  const handleSubmit = async () => {
    // Perform validation, e.g., check if the fields are not empty
    if (!username || !password) {
      setAlert(true)
      return
    }
    console.log('username password', username, password)

    try {
      let headers = new Headers()
      let user = base64.encode(`${username}:${password}`)
      headers.set('Authorization', `Basic ${user}`)
      fetch('https://youth-connect-backend.onrender.com/signin', {
        method: 'POST',
        headers: headers,
      })
        .then(res => res.json())
        .then(data => {
          console.log('login success')
          console.log(data.user)
          setUser(data.user)
        })
    } catch (error) {
      console.log('ERROR SIGNING IN: ', error)
    }
    setShowModal(false)
  }

  return (
      <Center style={[themeContainerStyle]} >
        <Button
          testID='LOGIN BUTTON'
          style={[themeButtonStyle]}
          onPress={() => setShowModal(true)}

        >
          Log in
        </Button>
        <Modal
          testID='LOGIN'
          style={themeContainerStyle}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <Modal.Content maxWidth='400px'>
            <Modal.CloseButton />
            <Modal.Header>Log in to Youth Connect</Modal.Header>
            <Modal.Body>
              <FormControl testID='LOGIN FORM'>
                <FormControl.Label>Username</FormControl.Label>
                <Input
                  style={themeInputStyle}
                  onChangeText={setUsername}
                  returnKeyType='next' //
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
                  style={themeInputStyle}
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
                  style={[themeButtonStyle]}
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
                  style={[themeButtonStyle]}
                  disabled={user?.username ? true : false}
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
      )
}

      export default LoginModal
