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
// import { TextInput } from 'react-native-gesture-handler';
import { createRoom } from '../utils/APIFunctions'
import { UserContext, ThemeContext } from '../App'
import { fetchRooms } from '../App'
import { styles, colors } from '../utils/styles'

export default function CreateRoomModal({ visible, onClose }) {
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [minimumAge, setMinimumAge] = useState(1)
  const [maxAge, MaxAge] = useState(100)
  const { rooms, setRooms } = useContext(UserContext)
  const [alert, setAlert] = useState(false)
  const { colorScheme, themeButtonStyle } = useContext(ThemeContext)

  const createRoom = async payload => {
    const method = 'POST'
    const url = 'https://youth-connect-backend.onrender.com/api/v1/rooms'
    const action = 'CREATING ROOM'
    let headers = new Headers()
    const body = {
      name: name,
      users: null,
      description: description,
      minimumAge: minimumAge,
      maxAge: maxAge,
    }
    // Basic auth only
    // let user = base64.encode(`${username}:${password}`);
    // Bearer auth only
    //headers.set('Authorization', `Bearer ${user.token}`);
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
          console.log('Data from create room', data)
          setShowModal(false)
          fetchRooms(setRooms)
        })
    } catch (error) {
      console.log('ERROR ', action, ':', error)
    }
    // ...
  }

  const handleSubmit = async () => {
    if (!name || !description) {
      setAlert(true)
      return
    }
    await createRoom()
    console.log('finished creating room')
    /*let newRoom =  await createRoom({
            name: name,
            users: null,
            description: description,
            minimumAge: minimumAge,
            maxAge: maxAge,
        })
        
        setShowModal(false) 
        console.log(newRoom);
        
        setRooms([...rooms,newRoom])*/
  }

  return (
    <>
      <Button
        style={[themeButtonStyle]}
        mt={10}
        // size={'sm'}
        onPress={() => {
          setShowModal(true)
        }}
      >
        Create Room
      </Button>
      <Modal
        style={{
          backgroundColor:
            colorScheme === 'light' ? 'white' : colors.backgroundDarker,
        }}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Content
          style={{
            backgroundColor:
              colorScheme === 'light' ? 'white' : colors.backgroundDark,
          }}
          maxWidth='400px'
        >
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                //    style={themeInputStyle}
                onChangeText={setName}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Description</FormControl.Label>
              <Input
                // style={styles.darkContainer}
                onChangeText={setDescription}
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
                  console.log(
                    'roomData:',
                    name,
                    description,
                    maxAge,
                    minimumAge
                  )
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
    </>
  )
}
