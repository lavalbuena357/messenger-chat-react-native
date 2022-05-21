import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Time from '../Time/Time'
import ReactTimeAgo from 'react-time-ago'
import useStyles from './MessageItem.styles'

const MessageItem = ({message, currentUser, contact, isPrev}, props) => {

  const styles = useStyles()

  return (
    <View style={isPrev ? styles.prevContainer : styles.container}>
      <TouchableOpacity
        style={message.from === currentUser.uid ? styles.messageMe : styles.messageContact} >
        <Text style={styles.messageText}>{message.message}</Text>
        <ReactTimeAgo {...props} date={message.createdAt} component={Time} />
      </TouchableOpacity>
    </View>
  )
}

export default MessageItem