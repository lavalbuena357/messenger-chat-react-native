import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { blockContact, removeContact } from '../../redux/actions'
import Loader from '../Loader/Loader'
import ModalTemplate from '../ModalTemplate/ModalTemplate'
import ModalTouchableCustom from '../ModalTouchableCustom/ModalTouchableCustom'
import useStyles from '../ModalTemplate/ModalTemplate.styles'

const ModalMenuActions = ({showActionsModal, setShowActionsModal, uidSelected, isLoading, setIsLoading}) => {
  const [action, setAction] = useState('')
  const [modalConfirm, setModalConfirm] = useState(false)

  const navigation = useNavigation()
  const currentUser = useSelector(state => state.currentUser)

  const styles = useStyles()

  const handleEditContact = () => {
    setShowActionsModal(false)
    navigation.navigate('Contact', {contactUid: uidSelected})
  }

  const handleBlockContact = () => {
    setAction('Bloquear')
    setModalConfirm(true)
  }

  const confirmBlock = async() => {
    setModalConfirm(false)
    setShowActionsModal(false)
    setIsLoading(true)
    await blockContact(currentUser.uid, uidSelected)
    setIsLoading(false)
  }

  const handleDeleteContact = () => {
    setAction('Eliminar')
    setModalConfirm(true)
  }

  const confirmDelete = async() => {
    setModalConfirm(false)
    setShowActionsModal(false)
    setIsLoading(true)
    await removeContact(currentUser.uid, uidSelected)
    setIsLoading(false)
  }

  return (
    <View>
      <ModalTemplate
        modalVisible={showActionsModal}
        setModalVisible={setShowActionsModal}
        swipeDistance={250}
        titleIcon='people'
        title='Opciones de contacto' >
        <ModalTouchableCustom handleFunction={handleEditContact} iconName='user-edit' buttonName='Ediar contacto' />
        <ModalTouchableCustom handleFunction={handleBlockContact} iconName='user-slash' buttonName='Bloquear contacto' />
        <ModalTouchableCustom handleFunction={handleDeleteContact} iconName='trash' buttonName='Eliminar contacto' />
      </ModalTemplate>
      {/* MODAL DE CONFIRMACION */}
      <ModalTemplate
        modalVisible={modalConfirm}
        setModalVisible={setModalConfirm}
        swipeDistance={280}
        titleIcon='hand-left'
        title={`¿${action} este contacto?`} >
        <Text style={{textAlign: 'center', marginVertical: 10, color: styles.placeholder.color}}>
          {action === 'Bloquear' ? 
          '\nSe moverá a la lista de contactos bloqueados y las conversaciones serán archivadas.' : 
          '\nSe borrará permanentemente este contacto, pero se conservarán las conversaciones actuales.'}
        </Text>
        <ModalTouchableCustom iconName='check' buttonName='Si' handleFunction={action === 'Bloquear' ? confirmBlock : confirmDelete} />
        <ModalTouchableCustom iconName='reply' buttonName='No' handleFunction={() => setModalConfirm(false)} />
      </ModalTemplate>
      {isLoading && <Loader color={styles.loader.color} size={60} />}
    </View>
  )
}

export default ModalMenuActions