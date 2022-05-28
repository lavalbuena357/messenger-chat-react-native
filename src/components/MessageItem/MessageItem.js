import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Time from '../Time/Time'
import ReactTimeAgo from 'react-time-ago'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './MessageItem.styles'

const MessageItem = ({message, currentUser, contact, isPrev}, props) => {

  const styles = useStyles(getStyles)

  return (
    <View style={isPrev ? styles.prevContainer : styles.container}>
      <View style={message.from === currentUser.uid ? styles.messageMe : styles.messageContact}>
        <TouchableOpacity >
          {message.cate === 'text' ?
          <Text style={styles.messageText}>{message.message}</Text>
          :
          <Text style={styles.messageTextOnlyEmoji}>{message.message}</Text>
          }
          <ReactTimeAgo {...props} date={message.createdAt} component={Time} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MessageItem