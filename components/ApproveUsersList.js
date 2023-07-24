import React from 'react'
import { VStack, Button, Modal, Center } from 'native-base'
import { useState } from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../App'
export default function ApproveUsersList() {
  const [showModal, setShowModal] = useState(false)
  const [users, setUsers] = useState([])
  const { themeButtonStyle } = useContext(ThemeContext)

  const getUsers = () => {
    // fetch to https://youth-connect-backend.onrender.com/unapproved
    // setUsers(data)
  }

  const approveUser = userId => {
    // fetch to https://youth-connect-backend.onrender.com/users/${userId}/approve
    // getUsers() // <-- to refresh
  }

  return (
    <Center>
      <Button style={themeButtonStyle} onPress={() => setShowModal(true)}>
        Approve Users
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        _backdrop={{
          _dark: {
            bg: 'coolGray.800',
          },
          bg: 'warmGray.50',
        }}
      >
        <Modal.Content maxWidth='350' maxH='500'>
          <Modal.CloseButton />
          <Modal.Header>Unapproved Users</Modal.Header>
          <Modal.Body>
            <VStack space={2}>
              {users.length > 0 &&
                users.map(user => {
                  return (
                    <Button
                      onPress={() => {
                        approveUser(user._id)
                      }}
                    >
                      {user.username} | {user.role} |{' '}
                      {user.approved ? '✔️' : '❌'}
                    </Button>
                  )
                })}
            </VStack>
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
                  getUsers()
                }}
              >
                Refresh
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false)
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  )
}
