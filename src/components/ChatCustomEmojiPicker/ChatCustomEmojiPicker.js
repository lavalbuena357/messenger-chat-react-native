import { View, Text } from 'react-native'
import React from 'react'
import emoji, { getHeight } from './data'
import useStyles from './ChatCustomEmojiPicker.styles'

const ChatCustomEmojiPicker = ({isEmojiOpen}) => {
  const styles = useStyles()

  return (
    <>
      {isEmojiOpen && <View style={styles.contentModal}>
      <View>
        <Text>Modal</Text>
      </View>
    </View>}
    </>
  )
}

export default ChatCustomEmojiPicker