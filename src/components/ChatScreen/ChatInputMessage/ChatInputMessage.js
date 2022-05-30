import { View, TextInput, Keyboard, Pressable, TouchableHighlight } from 'react-native'
import React, { memo, useRef, useState } from 'react'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import ChatModalImage from '../ChatModalImage/ChatModalImage'
import UseKeyboard from '../ChatCustomEmojiPicker/UseKeyboard'
import useStyles from '../../../Hooks/UseStyles'
import { getStyles } from './ChatInputMessage.styles'
import { getEmojisState, submitChat } from '../../../redux/actions/chats'

const ChatInputMessage = ({
    contact, 
    setStyleHidden,
    messageText,
    setMessageText}) => {
  const [isModalImage, setIsModalImage] = useState(false)

  const styles = useStyles(getStyles)
  const currentUser = useSelector(state => state.userReducer.currentUser)
  const isEmojiOpen = useSelector(state => state.chatsReducer.isEmojiOpen)
  const uid = currentUser.uid 
  const inputRef = useRef()
  const keyboardHeight = UseKeyboard()
  const dispatch = useDispatch()

  //temp
  const micSelected = false

  const handleChange = (text) => {
    setMessageText(text)
  }

  const handleSendMessage = () => {
    setMessageText('')
    submitChat(uid, contact.uid, messageText, 'text')
  }

  const changeEmojiKeyboardIcon = () => {
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
          <TouchableHighlight 
            style={styles.iconButton}
            onPressIn={() => setIsModalImage(true)}
            disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
            <Icon name='attach' size={26} color={styles.iconColor.color} />
          </TouchableHighlight>
          <ChatModalImage isModalImage={isModalImage} setIsModalImage={setIsModalImage} contact={contact} />
        </View>
      </View>
      {messageText.length ? 
      <TouchableHighlight 
        style={styles.micButton} 
        onPressIn={handleSendMessage}
        disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
        <MatIcon name='send' size={22} color={styles.iconColor.color} />
      </TouchableHighlight>
      :
      <TouchableHighlight 
        onPress={() => console.log('mic')}
        style={contact.blocked[uid] || currentUser.blocked[contact.uid] ? styles.micButtonDisabled : styles.micButton}
        disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
        <MatIcon name={micSelected ? 'microphone' : 'microphone'} size={26} color={styles.iconColor.color} />
      </TouchableHighlight>
      }
    </View>
  )
}

export default memo(ChatInputMessage)