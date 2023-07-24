import React from 'react'
import { VStack, Button, Modal, Center } from 'native-base'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ThemeContext, UserContext } from '../App'
import base64 from 'base-64'
export default function ApproveUsersList() {
  const { user } = useContext(UserContext)
  const [showModal, setShowModal] = useState(false)
  const [users, setUsers] = useState([])
  const { themeButtonStyle } = useContext(ThemeContext)


  const getUsers = async () => {
    try {
      let headers = new Headers()

      headers.set('Authorization', `Bearer ${user.token}`)
      fetch('https://youth-connect-backen.onrender.com/users/unapproved', {
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
      fetch(`https://youth-connect-backen.onrender.com/users/${userId}/approve`, {
        method: 'POST',
        headers: headers,
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
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
                users.map(user => {
                  return (
                    <Button
                      onPress={() => {
                        approveUser(user.id)
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
