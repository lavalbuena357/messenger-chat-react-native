import { View, TextInput, Keyboard, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons'
import { submitChat } from '../../redux/actions'
import { useSelector } from 'react-redux'
import ChatModalImage from '../ChatModalImage/ChatModalImage'
import UseKeyboard from '../ChatCustomEmojiPicker/UseKeyboard'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './ChatInputMessage.styles'

const ChatInputMessage = ({
    contact, 
    isLoadMore, 
    setIsLoadMore, 
    setIsEmojiOpen, 
    isEmojiOpen,
    setStyleHidden,
    messageText,
    setMessageText}) => {
  const [isModalImage, setIsModalImage] = useState(false)

  const styles = useStyles(getStyles)
  const {currentUser} = useSelector(state => state)
  const {uid} = currentUser 
  const inputRef = useRef()
  const keyboardHeight = UseKeyboard()

  //temp
  const micSelected = false

  const handleChange = (text) => {
    setMessageText(text)
  }

  const handleSendMessage = () => {
    if(isLoadMore) {
      setIsLoadMore(false)
    } else {
      setMessageText('')
      submitChat(uid, contact.uid, messageText, 'text')
    }
  }

  const changeEmojiKeyboardIcon = () => {
    if(keyboardHeight > 0 && isEmojiOpen) {
      setIsEmojiOpen(false)
      inputRef.current.focus()
    } else if(keyboardHeight === 0 && !isEmojiOpen) {
      setIsEmojiOpen(true)
      setStyleHidden(true)
      Keyboard.dismiss()
    } else if(keyboardHeight === 0 && isEmojiOpen) {
      inputRef.current.focus()
      setIsEmojiOpen(false)
    } else {
      setIsEmojiOpen(true)
      Keyboard.dismiss()
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
          onFocus={() => setIsEmojiOpen(false)}
          // autoFocus={true}
          editable={contact.blocked[uid] || currentUser.blocked[contact.uid] ? false : true}
          defaultValue={messageText}
          onChangeText={handleChange}
          style={styles.text}  />
        <View style={{flexDirection: 'row'}}>
          <Pressable 
            style={styles.iconButton}
            onPressIn={() => setIsModalImage(true)}
            disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
            <Icon name='attach' size={26} color={styles.iconColor.color} />
          </Pressable>
          <ChatModalImage isModalImage={isModalImage} setIsModalImage={setIsModalImage} />
        </View>
      </View>
      {messageText.length ? 
      <Pressable 
        style={styles.micButton} 
        onPressIn={handleSendMessage}
        disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
        <MatIcon name='send' size={22} color={styles.iconColor.color} />
      </Pressable>
      :
      <Pressable 
        style={contact.blocked[uid] || currentUser.blocked[contact.uid] ? styles.micButtonDisabled : styles.micButton}
        disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
        <MatIcon name={micSelected ? 'microphone' : 'microphone'} size={26} color={styles.iconColor.color} />
      </Pressable>
      }
    </View>
  )
}

export default ChatInputMessage