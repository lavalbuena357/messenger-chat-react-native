import { View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons'
import useStyles from './ChatInputMessage.styles'
import { submitChat } from '../../redux/actions'
import { useSelector } from 'react-redux'
import ChatModalImage from '../ChatModalImage/ChatModalImage'
import UseKeyboard from '../ChatCustomEmojiPicker/UseKeyboard'

const ChatInputMessage = ({
    uid, 
    contact, 
    isLoadMore, 
    setIsLoadMore, 
    setIsEmojiOpen, 
    isEmojiOpen,
    setStyleHidden
  }) => {
  const [messageText, setMessageText] = useState('')
  const [isOnlyEmoji, setIsOnlyEmoji] = useState(false)
  const [isModalImage, setIsModalImage] = useState(false)

  const styles = useStyles()
  const {currentUser} = useSelector(state => state)
  const inputRef = useRef()
  const keyboardHeight = UseKeyboard()

  //temp
  const micSelected = false

  const handleChange = (text) => {
    setMessageText(text)
  }

  const handleSendMessage = () => {
    setIsOnlyEmoji(false)
    if(isLoadMore) {
      setIsLoadMore(false)
    }
    if(isOnlyEmoji && messageText.length === 2) {
      setMessageText('')
      submitChat(uid, contact.uid, messageText, 'emoji')
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
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={changeEmojiKeyboardIcon}
          disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
          <MatIcon name={isEmojiOpen ? 'keyboard' : 'emoticon'} size={26} color={styles.iconColor.color}/>
        </TouchableOpacity>
        <TextInput
          placeholder='Mensaje'
          ref={inputRef}
          placeholderTextColor={styles.iconColor.color}
          multiline
          autoFocus={true}
          editable={contact.blocked[uid] || currentUser.blocked[contact.uid] ? false : true}
          defaultValue={messageText}
          onChangeText={handleChange}
          style={styles.text}  />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setIsModalImage(true)}
            disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
            <Icon name='attach' size={26} color={styles.iconColor.color} />
          </TouchableOpacity>
          <ChatModalImage isModalImage={isModalImage} setIsModalImage={setIsModalImage} />
        </View>
      </View>
      {messageText.length ? 
      <TouchableOpacity 
        style={styles.micButton} 
        onPress={handleSendMessage}
        disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
        <MatIcon name='send' size={22} color={styles.iconColor.color} />
      </TouchableOpacity>
      :
      <TouchableOpacity 
        style={contact.blocked[uid] || currentUser.blocked[contact.uid] ? styles.micButtonDisabled : styles.micButton}
        disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
        <MatIcon name={micSelected ? 'microphone' : 'microphone'} size={26} color={styles.iconColor.color} />
      </TouchableOpacity>
      }
    </View>
  )
}

export default ChatInputMessage