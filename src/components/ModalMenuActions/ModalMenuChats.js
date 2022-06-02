import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ModalTemplate from '../ModalTemplate/ModalTemplate'
import ModalTouchableCustom from '../ModalTouchableCustom/ModalTouchableCustom'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from '../ModalTemplate/ModalTemplate.styles'
import Loader from '../Loader/Loader'
import { removeChat } from '../../redux/actions/chats'
import { useSelector } from 'react-redux'

const ModalMenuChats = ({showActionsModal, setShowActionsModal, uidSelected, isLoading, setIsLoading}) => {
  const [modalConfirm, setModalConfirm] = useState(false)

  const styles = useStyles(getStyles)
  const currentUser = useSelector(state => state.userReducer.currentUser)

  const handleDeleteContact = () => {
    setModalConfirm(true)
  }

  const confirmDelete = async() => {
    setModalConfirm(false)
    setShowActionsModal(false)
    setIsLoading(true)
    await removeChat(currentUser.uid, uidSelected)
    setIsLoading(false)
  }

  return (
    <View>
      <ModalTemplate
        modalVisible={showActionsModal}
        setModalVisible={setShowActionsModal}
        swipeDistance={100}
        titleIcon='chatbubble'
        title='Opciones de chat' >
        <ModalTouchableCustom handleFunction={handleDeleteContact} iconName='trash' buttonName='Eliminar chat' />
      </ModalTemplate>
      {/* MODAL DE CONFIRMACION */}
      <ModalTemplate
        modalVisible={modalConfirm}
        setModalVisible={setModalConfirm}
        swipeDistance={280}
        titleIcon='hand-left'
        title={`¿Eliminar este chat?`} >
        <Text style={{textAlign: 'center', marginVertical: 10, color: styles.placeholder.color}}>
          Se borrará permanentemente esta conversación
        </Text>
        <ModalTouchableCustom iconName='check' buttonName='Si' handleFunction={confirmDelete} />
        <ModalTouchableCustom iconName='reply' buttonName='No' handleFunction={() => setModalConfirm(false)} />
      </ModalTemplate>
      {isLoading && <Loader color={styles.loader.color} size={60} />}
    </View>
  )
}

export default ModalMenuChats