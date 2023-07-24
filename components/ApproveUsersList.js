import React from 'react'
import { VStack, Box, Button, Modal, Center, Text } from 'native-base'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ThemeContext, UserContext } from '../App'
import ThemedText from './ThemedText'
export default function ApproveUsersList() {
  const { user } = useContext(UserContext)
  const [showModal, setShowModal] = useState(false)
  const [users, setUsers] = useState([])
  const { themeTextStyle, themeButtonStyle } = useContext(ThemeContext)

  const getUsers = async () => {
    try {
      let headers = new Headers()

      headers.set('Authorization', `Bearer ${user.token}`)
      fetch('https://youth-connect-backend.onrender.com/users/unapproved', {
        method: 'GET',
        headers: headers,
      })
        .then(res => res.json())
        .then(data => {
          setUsers(data)
        })
    } catch (error) {
      console.log('ERROR GETTING USERS: ', error)
    }
  }

  const approveUser = async userId => {
    console.log(userId)
    try {
      let headers = new Headers()

      headers.set('Authorization', `Bearer ${user.token}`)
      fetch(
        `https://youth-connect-backend.onrender.com/users/${userId}/approve`,
        {
          method: 'PUT',
          headers: headers,
        }
      )
        .then(res => res.json())
        .then(data => {
          getUsers()
        })
    } catch (error) {
      console.log('ERROR SIGNING IN: ', error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

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
                users.map((user, i) => {
                  return (
                    <Box key={i}>
                      <Button
                        style={themeButtonStyle}
                        onPress={() => {
                          approveUser(user.id)
                        }}
                      >
                        <Text>
                          {user.username} | {user.role} ✔️{' '}
                        </Text>
                      </Button>
                    </Box>
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
