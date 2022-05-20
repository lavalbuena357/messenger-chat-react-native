import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactTimeAgo from 'react-time-ago'
import useStyles from './ChatItem.styles'
import Time from '../Time/Time'
import { getUserById } from '../../redux/actions'

const ChatItem = ({chat, myUid, uidSelected, handleSelected, handleGoToContactChat}, props) => {
  const [contact, setContact] = useState(null)

  const styles = useStyles()
  const {contacts, chats, contactsBlocked} = useSelector(state => state)
  
  useEffect(() => {
    if(chats.length) {
      if(contacts && contacts[chat.with]) {
        setContact({...contacts[chat.with], isContact: true})
      } else if(contactsBlocked && contactsBlocked[chat.with]) {
        setContact({...contactsBlocked[chat.with], isContact: true, blocked: true})
      } else {
        (async() => {
          const getUser = await getUserById(chat.with)
          setContact({...getUser, isContact: false})
        })()
      }
    }
  }, [contacts])

  return (
    <>
    {contact &&
    <TouchableOpacity
      delayLongPress={400}
      onLongPress={() => handleSelected(contact.uid)}
      onPress={() => handleGoToContactChat(contact)}
      style={uidSelected === contact.uid ? styles.containerSelected : styles.container} >
      <View style={styles.left}>
        <View style={contact.blocked || contact.online === undefined ? {}: contact.online ? styles.online : styles.offline}></View>
        <Image source={{uri:contact.photoURL}} style={styles.photoURL} />
        <View style={styles.info}>
          {contact.isContact ? 
          <Text style={contact.blocked ? styles.nameBlocked : styles.name}>
            {contact.nickname && contact.nickname[myUid] ? 
            `${contact.nickname[myUid].slice(0, 25)}${contact.nickname[myUid].length > 25 ? '...': ''}` 
            : 
            `${contact.displayName.slice(0, 25)}${contact.displayName.length > 25 ? '...' : ''}`
            }
          </Text>
          :
          <Text style={contact.blocked ? styles.nameBlocked : styles.name}>
            {`${contact.email.slice(0, 25)}${contact.email.length > 25 ? '...': ''}`}
          </Text>
          }
          <Text style={contact.blocked ? styles.messageBlocked : styles.message}>
            {`${chat.message.slice(0, 30)}${chat.message.length > 30 ? '...': ''}`}
          </Text>
        </View>
      </View>
      {contact.blocked ? null :
      <View style={styles.right}>
        <ReactTimeAgo {...props} date={chat.createdAt} component={Time} />
      </View>
      }
    </TouchableOpacity>}
    </>
  )
}

export default ChatItem