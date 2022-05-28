import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import Time from '../Time/Time'
import ReactTimeAgo from 'react-time-ago'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './MessageItem.styles'
import { useSelector } from 'react-redux'

const MessageItem = ({message}, props) => {

  const styles = useStyles(getStyles)
  const {currentUser} = useSelector(state => state)

  return (
    <View style={styles.container}>
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

export default memo(MessageItem)