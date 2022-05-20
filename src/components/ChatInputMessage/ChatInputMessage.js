import { View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons'
import useStyles from './ChatInputMessage.styles'
import { submitChat } from '../../redux/actions'

const ChatInputMessage = ({uid, contact}) => {
  const [messageText, setMessageText] = useState('')

  const styles = useStyles()

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
      <View style={contact.blocked ? styles.messageInputDisabled : styles.messageInput}>
        <TouchableOpacity 
          style={styles.iconButton}
          disabled={contact.blocked} >
          <MatIcon name={emoSelectIcon ? 'emoticon' : 'emoticon-outline'} size={26} color={styles.iconColor.color}/>
        </TouchableOpacity>
        <TextInput
          placeholder='Mensaje'
          placeholderTextColor={styles.iconColor.color}
          multiline
          editable={contact.blocked ? false : true}
          defaultValue={messageText}
          onChangeText={handleChange}
          style={styles.text}  />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity 
            style={styles.iconButton}
            disabled={contact.blocked} >
            <Icon name='attach' size={26} color={styles.iconColor.color} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            disabled={contact.blocked} >
            <MatIcon name='camera' size={24} color={styles.iconColor.color} />
          </TouchableOpacity>
        </View>
      </View>
      {messageText.length ? 
      <TouchableOpacity 
        style={styles.micButton} 
        onPress={handleSendMessage}
        disabled={contact.blocked} >
        <MatIcon name='send' size={22} color={styles.iconColor.color} />
      </TouchableOpacity>
      :
      <TouchableOpacity 
        style={contact.blocked ? styles.micButtonDisabled : styles.micButton}
        disabled={contact.blocked} >
        <MatIcon name={micSelected ? 'microphone' : 'microphone'} size={26} color={styles.iconColor.color} />
      </TouchableOpacity>
      }
    </View>
  )
}

export default ChatInputMessage