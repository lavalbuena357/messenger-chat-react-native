import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useStyles from '../../screens/ChatScreen/ChatScreen.styles'
import { addContact } from '../../redux/actions'
import { useSelector } from 'react-redux'

const ChatStatusBar = ({contact, uid}) => {

  const styles = useStyles()
  const {currentUser} = useSelector(state => state)

  const handleAddContact = () => {
    addContact(uid, contact.email)
  }

  return (
    <>
      {currentUser.blocked[contact.uid] ? 
      <TouchableOpacity style={styles.buttonAdd} onPress={handleAddContact}>
        <Text>Desbloquear contacto</Text>
      </TouchableOpacity>
      : contact.blocked[currentUser.uid] ? 
      <TouchableOpacity disabled style={styles.buttonAdd}>
        <Text>El usuario te tiene bloqueado</Text>
      </TouchableOpacity>
      :contact.isContact ? 
      <Text style={styles.status}>{contact.status.slice(0, 50)}{contact.status.length > 50 ? '...': ''}</Text>
      :
      <TouchableOpacity style={styles.buttonAdd} onPress={handleAddContact}>
        <Text>Agregar contacto</Text>
      </TouchableOpacity> 
      }
    </>
  )
}

export default ChatStatusBar