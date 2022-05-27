import { View } from 'react-native'
import React from 'react'
import useStyles from './ChatCustomEmojiPicker.styles'
import EmojiNavigator from './EmojiNavigator'

const ChatCustomEmojiPicker = ({
  isEmojiOpen, 
  setMessageText}) => {

  const styles = useStyles()
  
  return (
    <>
      {isEmojiOpen && 
      <View style={styles.contentModal}>
        <EmojiNavigator setMessageText={setMessageText} />
      </View>
      }
    </>
  )
}

export default ChatCustomEmojiPicker