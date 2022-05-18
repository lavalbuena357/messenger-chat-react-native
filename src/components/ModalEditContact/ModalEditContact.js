import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'
import { editContact } from '../../redux/actions'
import useStyles from '../ModalAddContact/ModalAddContact.styles'
import Loader from '../Loader/Loader'

const ModalEditContact = ({setShowInput, showInput, contact}) => {
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState({error: false, message: ''})

  const styles = useStyles()
  const currentUser = useSelector(state => state.currentUser)

  useEffect(() => {
    if(contact && contact.nickname && contact.nickname[currentUser.uid]) {
      setUsername(contact.nickname[currentUser.uid])
    } else {
      setUsername(contact.displayName)
    }
  }, [contact])

  const handleChange = (text) => {
    setUsername(text)
    setIsError({error: false, message: ''})
  }

  const handleEditContact = async() => {
    setIsError({error: false, message: ''})
    setIsLoading(true)
    if(username.length) {
      await editContact(currentUser.uid, contact.uid, username)
      setUsername('')
      setShowInput(false)
      setIsLoading(false)
    } else {
      setIsError({error: true, message: 'El campo no puede estar vacio'})
      setIsLoading(false)
    }
  }

  return (
    <Modal
      isVisible={showInput}
      onBackdropPress={() => setShowInput(false)}
      onBackButtonPress={() => setShowInput(false)}
      onSwipeComplete={() => setShowInput(false)}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      swipeDirection="down"
      style={styles.modelContentView} >
      <View style={styles.contentModal}>
        <View style={styles.upLine}></View>
        <View style={styles.titleBox}>
            <Icon name='create' color={styles.icon.color} size={16} style={styles.icon} />
            <Text style={styles.contentModalTitle}>Editar nombre de contacto</Text>
        </View>
        <TextInput 
          autoComplete='name'
          keyboardType='default'
          textContentType='name'
          onChangeText={handleChange} 
          defaultValue={username}
          placeholderTextColor={styles.icon.color}
          placeholder={isError.error ? isError.message : 'Ingrese un nuevo nombre'} 
          style={styles.input} />
        <TouchableOpacity style={styles.addButton} onPress={handleEditContact}>
          <Text style={styles.addButtonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>
      {isLoading && <Loader color={styles.loader.color} size={60} />}
    </Modal>
  )
}

export default ModalEditContact