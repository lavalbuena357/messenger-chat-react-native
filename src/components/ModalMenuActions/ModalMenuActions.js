import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons'
import useStyles from './ModalMenuActions.styles'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const ModalMenuActions = ({showActionsModal, setShowActionsModal, uidSelected}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [action, setAction] = useState('')
  const [modalConfirm, setModalConfirm] = useState(false)

  const navigation = useNavigation()
  const currentUser = useSelector(state => state.currentUser)

  const styles = useStyles()

  const handleEditContact = () => {

  }

  const handleBlockContact = () => {
    setAction('Bloquear')
    setModalConfirm(true)
  }

  const handleDeleteContact = () => {

  }

  return (
    <View>
      <Modal
        isVisible={showActionsModal}
        onBackButtonPress={() => setShowActionsModal(false)}
        onBackdropPress={() => setShowActionsModal(false)}
        onSwipeComplete={() => setShowActionsModal(false)}
        backdropTransitionInTiming={1}
        backdropTransitionOutTiming={1}
        swipeThreshold={280}
        animationInTiming={1}
        animationOutTiming={1}
        swipeDirection="down"
        style={styles.modalContentView}>
        <View style={styles.contentModal}>
          <View style={styles.upLine}></View>
          <View style={styles.titleBox}>
            <IconMat name='account-alert' color={styles.icon.color} size={16} style={styles.icon}/>
            <Text style={styles.contentModalTitle}>Opciones de contacto</Text>
          </View>
          <View style={styles.boxButtons}>
            <TouchableOpacity style={styles.button} onPress={handleEditContact}>
              <Icon name='create' size={24} color={styles.buttonText.color} />
              <Text style={styles.buttonText}>Editar contacto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleBlockContact}>
              <IconMat name='block-helper' size={20} color={styles.buttonText.color} />
              <Text style={styles.buttonText}>Bloquear contacto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDeleteContact}>
              <Icon name='trash' size={24} color={styles.buttonText.color} />
              <Text style={styles.buttonText}>Eliminar contacto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setShowActionsModal(false)}>
              <IconMat name='close-outline' size={20} color={styles.buttonClose.color} />
              <Text style={styles.buttonClose}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ModalMenuActions