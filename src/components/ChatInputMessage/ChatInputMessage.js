import { View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons'
import useStyles from './ChatInputMessage.styles'

const ChatInputMessage = () => {
  const [text, setText] = useState('')

  const styles = useStyles()

  //temp
  const emoSelectIcon = false
  const micSelected = false

  const handleChange = () => {

  }

  const handleSendMessage = () => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.messageInput}>
        
          <TouchableOpacity style={styles.iconButton}>
            <MatIcon name={emoSelectIcon ? 'emoticon' : 'emoticon-outline'} size={26} color={styles.iconColor.color}/>
          </TouchableOpacity>
          <TextInput
            placeholder='Mensaje'
            placeholderTextColor={styles.iconColor.color}
            multiline
            defaultValue={text}
            onChange={handleChange}
            style={styles.text}  />
        
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name='attach' size={26} color={styles.iconColor.color} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MatIcon name='camera' size={24} color={styles.iconColor.color} />
          </TouchableOpacity>
        </View>
      </View>
      {text.length ? 
      <TouchableOpacity style={styles.micButton}>
        <MatIcon name='send' size={22} color={styles.iconColor.color} />
      </TouchableOpacity>
      :
      <TouchableOpacity style={styles.micButton}>
        <MatIcon name={micSelected ? 'microphone' : 'microphone'} size={26} color={styles.iconColor.color} />
      </TouchableOpacity>
      }
    </View>
  )
}

export default ChatInputMessage