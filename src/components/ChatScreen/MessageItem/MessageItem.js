import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { memo } from 'react'
import Time from '../../Time/Time'
import ReactTimeAgo from 'react-time-ago'
import useStyles from '../../../Hooks/UseStyles'
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
          : message.cate === 'photo' ? 
          <Image 
            source={{uri: message.message}} 
            style={{
              borderRadius: 10,
              margin: 3,
              aspectRatio:parseFloat(message.metadata.aspectRatio),
              width: message.metadata.width === 'null' ? null : parseFloat(message.metadata.width) * 0.5,
              height: message.metadata.height === 'null' ? null : parseFloat(message.metadata.height) * 0.5
            }} />
          : null
          }
          <ReactTimeAgo {...props} date={message.createdAt} component={Time} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default memo(MessageItem)