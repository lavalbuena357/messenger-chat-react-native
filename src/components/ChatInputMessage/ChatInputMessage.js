import { View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons'
import useStyles from './ChatInputMessage.styles'
import { submitChat } from '../../redux/actions'
import { useSelector } from 'react-redux'

const ChatInputMessage = ({uid, contact}) => {
  const [messageText, setMessageText] = useState('')

  const styles = useStyles()
  const {currentUser} = useSelector(state => state)

  //temp
  const emoSelectIcon = false
  const micSelected = false

  const handleChange = (text) => {
    setMessageText(text)
  }

  const handleSendMessage = () => {
    setMessageText('')
    submitChat(uid, contact.uid, messageText, 'text')
  }

  return (
    <View style={styles.container}>
      <View style={contact.blocked[uid] || currentUser.blocked[contact.uid] ? styles.messageInputDisabled : styles.messageInput}>
        <TouchableOpacity 
          style={styles.iconButton}
          disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
          <MatIcon name={emoSelectIcon ? 'emoticon' : 'emoticon-outline'} size={26} color={styles.iconColor.color}/>
        </TouchableOpacity>
        <TextInput
          placeholder='Mensaje'
          placeholderTextColor={styles.iconColor.color}
          multiline
          editable={contact.blocked[uid] || currentUser.blocked[contact.uid] ? false : true}
          defaultValue={messageText}
          onChangeText={handleChange}
          style={styles.text}  />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity 
            style={styles.iconButton}
            disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
            <Icon name='attach' size={26} color={styles.iconColor.color} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            disabled={contact.blocked[uid] || currentUser.blocked[contact.uid]} >
            <MatIcon name='camera' size={24} color={styles.iconColor.color} />
          </TouchableOpacity>
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