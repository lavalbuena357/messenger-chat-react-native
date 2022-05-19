import { TextInput, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { editContact } from '../../redux/actions'
import Loader from '../Loader/Loader'
import useStyles from '../ModalTemplate/ModalTemplate.styles'
import ModalTemplate from '../ModalTemplate/ModalTemplate'
import ModalTouchableCustom from '../ModalTouchableCustom/ModalTouchableCustom'

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
    if(username.length > 30) {
      Alert.alert('El nombre no puede contener más de 30 caracteres')
    } else if(username.length) {
      setIsLoading(true)
      await editContact(currentUser.uid, contact.uid, username)
      setUsername('')
      setShowInput(false)
      setIsLoading(false)
    } else {
      setIsError({error: true, message: 'El campo no puede estar vacio'})
    }
  }

  return (
    <ModalTemplate
      modalVisible={showInput}
      setModalVisible={setShowInput}
      swipeDistance={200}
      titleIcon='create'
      title='Editar nombre de contacto' >
      <Text style={styles.nameLength}>{username.length}/30</Text>
      <TextInput 
        autoComplete='name'
        keyboardType='default'
        textContentType='name'
        onChangeText={handleChange} 
        defaultValue={username}
        placeholderTextColor={styles.placeholder.color}
        placeholder={isError.error ? isError.message : 'Ingrese un nuevo nombre'} 
        style={styles.input} />
      <ModalTouchableCustom handleFunction={handleEditContact} buttonName='Actualizar' type='text' />
      {isLoading && <Loader color={styles.loader.color} size={60} />}
    </ModalTemplate>
  )
}

export default ModalEditContact