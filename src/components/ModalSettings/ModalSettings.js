import { View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ModalTemplate from '../ModalTemplate/ModalTemplate'
import ModalTouchableCustom from '../ModalTouchableCustom/ModalTouchableCustom'

const ModalSettings = ({setShowModalSettings, showModalSettings}) => {

  const navigation = useNavigation()

  const goToScreen = (screen) => {
    setShowModalSettings(false)
    navigation.navigate(screen)
  }

  return (
    <ModalTemplate
      modalVisible={showModalSettings}
      setModalVisible={setShowModalSettings}
      swipeDistance={300}
      titleIcon='settings-sharp'
      title='Contiguración' >
      <View>
        <ModalTouchableCustom handleFunction={() => goToScreen('Profile')} iconName='user-astronaut' buttonName='Mi perfil' />
        <ModalTouchableCustom handleFunction={() => goToScreen('Privacity')} iconName='user-secret' buttonName='Privacidad' />
        <ModalTouchableCustom handleFunction={() => goToScreen('SoundsNotifications')} iconName='bell' buttonName='Sonidos y notificaciones' />
        <ModalTouchableCustom handleFunction={() => goToScreen('ContactsManager')} iconName='users-cog' buttonName='Administrar contactos' />
        <ModalTouchableCustom handleFunction={() => goToScreen('About')} iconName='info-circle' buttonName="Acerca de Let's Conn" />
      </View>
    </ModalTemplate>
  )
}

export default ModalSettings