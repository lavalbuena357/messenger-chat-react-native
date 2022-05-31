import { View, Text, TouchableOpacity, ToastAndroid, Vibration, Alert } from 'react-native'
import React, { useCallback, useState } from 'react'
import useStyles from '../../../Hooks/UseStyles'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getStyles } from './ChatInputMessage.styles'
import { useSelector } from 'react-redux'
import { requestAudioPermission } from '../../../utils/Permissions'
import ChatRecordAudio from '../ChatRecordAudio/ChatRecordAudio'

const ButtonMic = ({contact}) => {
  const [micSelected, setMicSelected] = useState(false)

  const currentUser = useSelector(state => state.userReducer.currentUser)
  const styles = useStyles(getStyles)
  const uid = currentUser.uid 

  const handleMicPressed = useCallback(() => {
    Vibration.vibrate(100, false)
    ToastAndroid.show('Mantenga pulsado y suelte para hablar', ToastAndroid.SHORT)
  }, [])

  const handleMicLongPressed = async() => {
    Vibration.vibrate(100, false)
    const resRecord = await requestAudioPermission()
    if(!resRecord) {
      setMicSelected(false)
      Alert.alert('Se requieren permisos', 'No se concedieron los permisos para utilizar el micrófono.')
    } else {
      setMicSelected(true)
    }
  }

  return (
    <>
      <TouchableOpacity 
        onLongPress={handleMicLongPressed}
        onPress={handleMicPressed}
        style={contact.blocked[uid] || currentUser.blocked[contact.uid] ? styles.micButtonDisabled : styles.micButton}
        disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
        <MatIcon name={'microphone'} size={26} color={styles.iconColor.color} />
      </TouchableOpacity>
      {micSelected && 
      <ChatRecordAudio setMicSelected={setMicSelected} contact={contact} />
      }
    </>
  )
}

export default ButtonMic