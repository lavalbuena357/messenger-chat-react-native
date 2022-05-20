import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactTimeAgo from 'react-time-ago'
import avatar from '../../assets/avatar.png'
import useStyles from './ChatItem.styles'
import Time from '../Time/Time'

const ChatItem = ({chat, myUid, uidSelected, handleSelected, handleGoToContactChat}, props) => {
  const [contact, setContact] = useState(null)

  const styles = useStyles()
  const {contacts} = useSelector(state => state)
  
  useEffect(() => {
    if(contacts !== null) {
      if(contacts[chat.contactUid] === undefined) {
        setContact({displayName: chat.email, photoURL: avatar, isContact: false, uid: chat.contactUid, online: undefined})
      } else {
        setContact({...contacts[chat.contactUid], isContact: true})
      }
    }
  }, [contacts])  

  return (
    <>
    {contact &&
    <TouchableOpacity
      delayLongPress={400}
      onLongPress={() => handleSelected(contact.uid)}
      onPress={() => handleGoToContactChat(contact.uid, contact.displayName)}
      style={uidSelected === contact.uid ? styles.containerSelected : styles.container} >
      <View style={styles.left}>
        <View style={contact.online ? styles.online : contact.online === undefined ? {display: 'none'} : styles.offline}></View>
        <Image source={contact.isContact ? {uri:contact.photoURL} : contact.photoURL} style={styles.photoURL} />
        <View style={styles.info}>
          <Text style={styles.name}>
            {contact.nickname && contact.nickname[myUid] ? 
            `${contact.nickname[myUid].slice(0, 25)}${contact.nickname[myUid].length > 25 ? '...': ''}` 
            : 
            `${contact.displayName.slice(0, 25)}${contact.displayName.length > 25 ? '...' : ''}`
            }
          </Text>
          <Text style={styles.message}>
            {`${chat.message.slice(0, 30)}${chat.message.length > 30 ? '...': ''}`}
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <ReactTimeAgo {...props} date={chat.createdAt} component={Time} />
      </View>
    </TouchableOpacity>}
    </>
  )
}

export default ChatItem