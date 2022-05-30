import { View, TextInput, Keyboard, Pressable, TouchableHighlight, Alert, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { memo, useCallback, useRef, useState } from 'react'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
// import Icon from 'react-native-vector-icons/Ionicons'
import FAwIcon from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
// import ChatModalImage from '../ChatModalImage/ChatModalImage'
import UseKeyboard from '../ChatCustomEmojiPicker/UseKeyboard'
import useStyles from '../../../Hooks/UseStyles'
import { getStyles } from './ChatInputMessage.styles'
import { getEmojisState, submitChat } from '../../../redux/actions/chats'
import { requestStoragePermission } from '../../../utils/Permissions'
import { launchImageLibrary } from 'react-native-image-picker'
import ModalPreview from '../ChatModalImage/ModalPreview'
import ChatRecordAudio from '../ChatRecordAudio/ChatRecordAudio'

const ChatInputMessage = ({
    contact, 
    setStyleHidden,
    messageText,
    setMessageText}) => {
  const [isModalImage, setIsModalImage] = useState(false)
  const [mediaData, setMediaData] = useState([])
  const [micSelected, setMicSelected] = useState(false)

  const styles = useStyles(getStyles)
  const currentUser = useSelector(state => state.userReducer.currentUser)
  const isEmojiOpen = useSelector(state => state.chatsReducer.isEmojiOpen)
  const uid = currentUser.uid 
  const inputRef = useRef()
  const keyboardHeight = UseKeyboard()
  const dispatch = useDispatch()

  const handleChange = (text) => {
    setMessageText(text)
  }

  const handleSendMessage = () => {
    setMessageText('')
    submitChat(uid, contact.uid, messageText, 'text')
  }

  const changeEmojiKeyboardIcon = useCallback(() => {
    if(keyboardHeight === 0 && isEmojiOpen) {
      inputRef.current.focus()
      dispatch(getEmojisState(false))
    } else if(keyboardHeight === 0 && !isEmojiOpen) {
      dispatch(getEmojisState(true))
      setStyleHidden(true)
    } else {
      dispatch(getEmojisState(true))
      Keyboard.dismiss()
    }
  }, [isEmojiOpen,keyboardHeight])

  const handleUpload = async(type) => {
    setMediaData([])
    const resStorage = await requestStoragePermission()
    if(resStorage) {
      const itemSelect = await launchImageLibrary({mediaType: type, maxWidth: 1024, maxHeight: 1024, includeBase64:true})
      if(itemSelect.assets) {
        setMediaData([[itemSelect.assets[0]], type])
        setIsModalImage(true)
      }
    } else {
      Alert.alert('Se requieren permisos', 'No concedieron los permisos para acceder al almacenamiento interno.')
    }
  }

  return (
    <View style={styles.container}>
      <View style={contact.blocked[uid] || currentUser.blocked[contact.uid] ? styles.messageInputDisabled : styles.messageInput}>
        <Pressable 
          style={styles.iconButton}
          onPressIn={changeEmojiKeyboardIcon}
          disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
          <MatIcon name={isEmojiOpen ? 'keyboard' : 'emoticon'} size={26} color={styles.iconColor.color}/>
        </Pressable>
        <TextInput
          placeholder='Mensaje'
          ref={inputRef}
          placeholderTextColor={styles.iconColor.color}
          multiline
          onFocus={() => dispatch(getEmojisState(false))}
          editable={contact.blocked[uid] || currentUser.blocked[contact.uid] ? false : true}
          defaultValue={messageText}
          onChangeText={handleChange}
          style={styles.text}  />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPressIn={() => handleUpload('photo')}
            disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
            <FAwIcon name='file-photo-o' size={24} color={styles.iconColor.color} />
          </TouchableOpacity>
          {/* {isModalImage && <ChatModalImage isModalImage={isModalImage} setIsModalImage={setIsModalImage} contact={contact} />} */}
          {isModalImage && 
          <ModalPreview
            isModalImage={isModalImage} 
            setIsModalImage={setIsModalImage}
            mediaData={mediaData}
            contact={contact} />
          }
        </View>
      </View>
      {messageText.length ? 
      <TouchableOpacity 
        style={styles.micButton} 
        onPressIn={handleSendMessage}
        disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
        <MatIcon name='send' size={22} color={styles.iconColor.color} />
      </TouchableOpacity>
      :
      <TouchableHighlight 
        onLongPress={() => setMicSelected(true)}
        onPress={(() => ToastAndroid.show('Mantenga pulsado para hablar', ToastAndroid.SHORT))}
        style={contact.blocked[uid] || currentUser.blocked[contact.uid] ? styles.micButtonDisabled : styles.micButton}
        disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
        <MatIcon name={micSelected ? 'microphone' : 'microphone-outline'} size={26} color={styles.iconColor.color} />
      </TouchableHighlight>
      }
      {micSelected && <ChatRecordAudio setMicSelected={setMicSelected} />}
    </View>
  )
}

export default memo(ChatInputMessage)