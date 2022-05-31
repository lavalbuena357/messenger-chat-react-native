import { View } from 'react-native'
import React, { memo } from 'react'
import useStyles from './ChatCustomEmojiPicker.styles'
import EmojiNavigator from './EmojiNavigator'
import { useSelector } from 'react-redux'
import Emojis from '../Emojis/Emojis'

const ChatCustomEmojiPicker = ({setMessageText}) => {

  const styles = useStyles()
  const isEmojiOpen = useSelector(state => state.chatsReducer.isEmojiOpen)
  
  return (
    <View style={isEmojiOpen ? styles.contentModal : styles.contentModalHidden}>
      <Emojis setMessageText={setMessageText} />
    </View> 
  )
}

export default memo(ChatCustomEmojiPicker)