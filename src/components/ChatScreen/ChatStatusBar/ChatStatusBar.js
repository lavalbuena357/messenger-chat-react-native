import { Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import useStyles from '../../../screens/ChatScreen/ChatScreen.styles'
import { useSelector } from 'react-redux'
import Loader from '../../Loader/Loader'
import { addContact, unblockContact } from '../../../redux/actions/contacs'

const ChatStatusBar = ({contact, setIsLoading, isLoading}) => {

  const styles = useStyles()
  const currentUser = useSelector(state => state.userReducer.currentUser)
  

  const handleAddContact = async() => {
    setIsLoading(true)
    await addContact(currentUser.uid, contact.email)
    setIsLoading(false)
  }
  
  const handleUnblock = async() => {
    setIsLoading(true)
    await unblockContact(currentUser.uid, contact.uid)
    setIsLoading(false)
  }

  return (
    <>
      {currentUser.blocked[contact.uid] ? 
      <TouchableOpacity style={styles.buttonAdd} onPress={handleUnblock}>
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
      {isLoading && <Loader color={styles.loading.color} size={60} />}
    </>
  )
}

export default memo(ChatStatusBar)