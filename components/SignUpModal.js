import { Button, Modal, FormControl, Input, Center } from 'native-base';
import React, { useState, useRef } from 'react';

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
      },
      // socket
    )
      .then((createdUser) => {

        console.log('user created', createdUser)
        // Close the modal
        onClose();
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        // Show an error message if there's an error during signup
        Alert.alert('Error', 'Failed to sign up. Please try again later.');
      });
  };

  const createUser = async (payload, socket) => {
    try {
      let createdUser = await axios.post(`https://youth-connect-server.onrender.com/api/v1/signup`, {
        username: payload.username,
        password: payload.password,
      });
      socket.emit('CREATED USER', createdUser);
      console.log('THIS IS THE CREATED USER------------', createdUser);
      return createdUser;
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  return(
    <Center>
      <Button onPress={() => setShowModal(true)}>Button</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
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
              setShowModal(false);
            }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>

  )
}

export default SignUpModal;