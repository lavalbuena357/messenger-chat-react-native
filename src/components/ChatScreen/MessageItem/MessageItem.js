import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { memo, useState } from 'react'
import Time from '../../Time/Time'
import ReactTimeAgo from 'react-time-ago'
import useStyles from '../../../Hooks/UseStyles'
import { getStyles } from './MessageItem.styles'
import { useSelector } from 'react-redux'
import ModalFullSizeImage from './ModalFullSizeImage'

const MessageItem = ({message}, props) => {
  const [modalImageFull, setModalImageFull] = useState(false)

  const styles = useStyles(getStyles)
  const currentUser = useSelector(state => state.userReducer.currentUser)

  return (
    <View style={styles.container}>
      <View style={message.from === currentUser.uid ? styles.messageMe : styles.messageContact}>
        <TouchableOpacity
          onPress={() => message.cate === 'photo' && setModalImageFull(true)}>
          {message.cate === 'text' ?
          <Text style={styles.messageText}>{message.message}</Text>
          : message.cate === 'photo' ? 
          <Image 
            source={{uri: message.message}} 
            style={{borderRadius: 10, margin: 3, width: parseFloat(message.metadata.width) * 0.5, height: parseFloat(message.metadata.height) * 0.5}} />
          : null
          }
          <ReactTimeAgo {...props} date={message.createdAt} component={Time} />
        </TouchableOpacity>
      </View>
      {modalImageFull && 
      <ModalFullSizeImage 
      setModalImageFull={setModalImageFull}
      modalImageFull={modalImageFull}
      message={message}  />
      }
    </View>
  )
}

export default memo(MessageItem)