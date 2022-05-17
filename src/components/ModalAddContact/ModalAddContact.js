import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import useStyles from './ModalAddContact.styles'
import Loader from '../Loader/Loader'
import { addContact } from '../../redux/actions'
import { useSelector } from 'react-redux'

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
    <Modal
      isVisible={showAddModal}
      backdropOpacity={0.7}
      onBackButtonPress={() => setShowAddModal(false)}
      onBackdropPress={() => setShowAddModal(false)}
      onSwipeComplete={() => setShowAddModal(false)}
      backdropTransitionInTiming={1}
      backdropTransitionOutTiming={1}
      swipeThreshold={200}
      animationInTiming={1}
      animationOutTiming={1}
      swipeDirection='down'
      style={styles.modelContentView} >
      <View style={styles.contentModal}>
        <View style={styles.upLine}></View>
        <View style={styles.titleBox}>
          <Icon name='ios-person-add-sharp' color={styles.icon.color} size={16} style={styles.icon} />
          <Text style={styles.contentModalTitle}>Agregar un contacto</Text>
        </View>
        <TextInput
          autoComplete='email'
          keyboardType='email-address'
          textContentType='emailAddress'
          onChangeText={handleChange}
          defaultValue={mail}
          placeholderTextColor={styles.input.color}
          placeholder={isError.error ? isError.message: 'Ingrese un email válido'}
          style={styles.input} />
        <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      {isLoading && <Loader color={styles.loader.color} size={60} />}
    </Modal>
  )
}

export default ModalAddContact