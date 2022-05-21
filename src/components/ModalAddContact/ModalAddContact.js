import { TextInput } from 'react-native'
import React, { useState } from 'react'
import Loader from '../Loader/Loader'
import { addContact } from '../../redux/actions'
import { useSelector } from 'react-redux'
import ModalTemplate from '../ModalTemplate/ModalTemplate'
import useStyles from '../ModalTemplate/ModalTemplate.styles'
import ModalTouchableCustom from '../ModalTouchableCustom/ModalTouchableCustom'

const ModalAddContact = ({setShowAddModal, showAddModal}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState({error: false, message: ''})
  const [mail, setMail] = useState('')

  const styles = useStyles()
  const currentUser = useSelector(state => state.currentUser)

  const handleChange = (text) => {
    setMail(text)
    setIsError({error: false, message: ''})
  }

  const handleAddContact = async() => {
    setIsError({error: false, message: ''})
    if(mail.length === 0) {
      setIsError({error: true, message: 'El campo no puede estar vacío'})
      setIsLoading(false)
    } else {
      setIsLoading(true)
      const add = await addContact(currentUser.uid, mail)
      if(add.status === 200) {
        setMail('')
        setShowAddModal(false)
      } else {
        setMail('')
        setIsError({error: true, message: add.message})
      }
      setIsLoading(false)
    }
  }

  return (
    <ModalTemplate
      modalVisible={showAddModal}
      setModalVisible={setShowAddModal}
      swipeDistance={200}
      titleIcon='ios-person-add-sharp'
      title='Agregar un contacto' >
      <TextInput
        autoComplete='email'
        keyboardType='email-address'
        textContentType='emailAddress'
        onChangeText={handleChange}
        defaultValue={mail}
        placeholderTextColor={styles.placeholder.color}
        placeholder={isError.error ? isError.message: 'Ingrese un email válido'}
        style={styles.input} />
      <ModalTouchableCustom handleFunction={handleAddContact} buttonName='Agregar' type='text' />
      {isLoading && <Loader color={styles.loader.color} size={60} />}
    </ModalTemplate>
  )
}

export default ModalAddContact