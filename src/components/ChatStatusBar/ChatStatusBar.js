import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useStyles from '../../screens/ChatScreen/ChatScreen.styles'
import { addContact } from '../../redux/actions'

const ChatStatusBar = ({contact, uid}) => {

  const styles = useStyles()

  const handleAddContact = () => {
    addContact(uid, contact.displayName)
  }

  return (
    <>
      {contact.isContact ? 
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