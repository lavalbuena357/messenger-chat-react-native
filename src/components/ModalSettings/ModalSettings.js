import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFAw from 'react-native-vector-icons/FontAwesome5'
import Modal from 'react-native-modal'
import useStyles from './ModalSettings.styles'
import { useNavigation } from '@react-navigation/native'

const ModalSettings = ({setShowModalSettings, showModalSettings}) => {

  const styles = useStyles()
  const navigation = useNavigation()

  return (
    <Modal
      isVisible={showModalSettings}
      onBackButtonPress={() => setShowModalSettings(false)}
        onBackdropPress={() => setShowModalSettings(false)}
        onSwipeComplete={() => setShowModalSettings(false)}
        backdropTransitionInTiming={1}
        backdropTransitionOutTiming={1}
        swipeThreshold={300}
        animationInTiming={1}
        animationOutTiming={1}
        swipeDirection="down"
        style={styles.modalContentView} >
      <View style={styles.contentModal}>
        <View style={styles.upLine}></View>
        <View style={styles.titleBox}>
          <Icon name='settings-sharp' color={styles.icon.color} size={16} style={styles.icon}/>
          <Text style={styles.contentModalTitle}>Configuración</Text>
        </View>
        <View style={styles.boxButtons}>
          <TouchableOpacity style={styles.button}>
            <Icon name='md-person-circle' size={28} color={styles.buttonText.color} />
            <Text style={styles.buttonText}>Mi perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <IconFAw name='user-secret' size={22} color={styles.buttonText.color} />
            <Text style={styles.buttonText}>Privacidad</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name='notifications-circle' size={28} color={styles.buttonText.color} />
            <Text style={styles.buttonText}>Sonidos y notificaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <IconFAw name='user-lock' size={20} color={styles.buttonText.color} />
            <Text style={styles.buttonText}>Administrar contactos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name='information-circle' size={28} color={styles.buttonText.color} />
            <Text style={styles.buttonText}>Acerca de Let's Conn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default ModalSettings