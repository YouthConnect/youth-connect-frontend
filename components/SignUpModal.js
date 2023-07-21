import { Button, Modal, FormControl, Input, Center, Alert } from 'native-base';
import React, { useState, useRef } from 'react';
import { createUser } from '../utils/APIFunctions';

const SignUpModal = ({ visible, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Perform validation, e.g., check if the fields are not empty
    if (!username || !password) {
      Alert.alert('Error', 'Please enter all required fields');
      return;
    }

    createUser(
      {
        username: username,
        password: password,
        DOB: '12/01/1990',
      },
      // socket
    )
      .then((createdUser) => {

        console.log('user created', createdUser)
        // Close the modal
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        // Show an error message if there's an error during signup
        Alert.alert('Error', 'Failed to sign up. Please try again later.');
      });
  };
  // const createUser = async (payload, socket) => {
  //   try {
  //     let createdUser = await axios.post(`https://youth-connect-server.onrender.com/signup`, {
  //       username: payload.username,
  //       password: payload.password,
  //     });
  //     socket.emit('CREATED USER', createdUser);
  //     console.log('THIS IS THE CREATED USER------------', createdUser);
  //     return createdUser;
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //   }
  // };
  return(
    <Center>
      <Button onPress={() => setShowModal(true)}>Sign Up</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Sign Up For Youth Connect</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                // style={styles.darkContainer}
                onChangeText={setUsername}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Password</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModal(false);
            }}>
                Cancel
              </Button>
              <Button onPress={() => {
              setShowModal(false); handleSubmit();
            }}>
                Submit
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>

  )
}

export default SignUpModal;