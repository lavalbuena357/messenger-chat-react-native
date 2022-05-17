import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons'
import useStyles from './ModalMenuActions.styles'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { blockContact, removeContact } from '../../redux/actions'
import Loader from '../Loader/Loader'

const ModalMenuActions = ({showActionsModal, setShowActionsModal, uidSelected}) => {
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)
    await blockContact(currentUser.uid, uidSelected)
    setModalConfirm(false)
    setShowActionsModal(false)
    setIsLoading(false)
  }

  const handleDeleteContact = () => {
    setAction('Eliminar')
    setModalConfirm(true)
  }

  const confirmDelete = async() => {
    setIsLoading(true)
    await removeContact(currentUser.uid, uidSelected)
    setModalConfirm(false)
    setShowActionsModal(false)
    setIsLoading(false)
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
      {/* MODAL DE CONFIRMACION */}
      <Modal
        isVisible={modalConfirm}
        onBackdropPress={() => setModalConfirm(false)}
        onBackButtonPress={() => setModalConfirm(false)}
        onSwipeComplete={() => setModalConfirm(false)}
        backdropTransitionInTiming={1}
        backdropTransitionOutTiming={1}
        animationIn='zoomIn'
        animationOutTiming={1}
        style={{alignItems: 'center'}} >
        <View>
          <Text style={{fontSize:17, fontWeight:'bold', textAlign: 'center'}}>{`¿${action} este contacto?`}</Text>
          {action === 'Bloquear' &&
          <Text style={{fontSize:13, textAlign: 'center'}}>{'\nSe moverá a la lista de contactos bloqueados.'}</Text>
          }
          <View style={{flexDirection:'row', marginTop:20, justifyContent:'space-around'}}>
            <TouchableOpacity 
              style={{padding:15}} 
              onPress={action === 'Bloquear' ? confirmBlock : action === 'Eliminar' && confirmDelete}>
              <Text style={{fontSize:18}}>Si</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:15}} onPress={() => setModalConfirm(false)}>
              <Text style={{fontSize:18}}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoading && <Loader color={styles.loader.color} size={60} />}
      </Modal>
    </View>
  )
}

export default ModalMenuActions