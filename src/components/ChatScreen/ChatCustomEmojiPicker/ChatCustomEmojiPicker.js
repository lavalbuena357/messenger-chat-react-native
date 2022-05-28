import { View } from 'react-native'
import React, { memo } from 'react'
import useStyles from './ChatCustomEmojiPicker.styles'
import EmojiNavigator from './EmojiNavigator'

const ChatCustomEmojiPicker = ({
  isEmojiOpen, 
  setMessageText}) => {

  const styles = useStyles()
  console.log('sdsf')
  
  return (
   
      <View style={styles.contentModal}>
        <EmojiNavigator setMessageText={setMessageText} />
      </View>
     
  )
}

export default memo(ChatCustomEmojiPicker)