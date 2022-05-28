import { View } from 'react-native'
import React, { memo } from 'react'
import useStyles from './ChatCustomEmojiPicker.styles'
import EmojiNavigator from './EmojiNavigator'

const ChatCustomEmojiPicker = ({isEmojiOpen, setMessageText}) => {

  const styles = useStyles()
  
  return (
    <View style={isEmojiOpen ? styles.contentModal : styles.contentModalHidden}>
      <EmojiNavigator setMessageText={setMessageText} />
    </View> 
  )
}

export default memo(ChatCustomEmojiPicker)