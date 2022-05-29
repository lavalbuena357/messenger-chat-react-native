import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactTimeAgo from 'react-time-ago'
import Time from '../Time/Time'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './ChatItem.styles'
import { getUserById } from '../../redux/actions/users'

const ChatItem = ({chat, uidSelected, handleSelected, handleGoToContactChat}, props) => {
  const [contact, setContact] = useState(null)

  const styles = useStyles(getStyles)
  const contacts = useSelector(state => state.contactsReducer.contacts)
  const chats = useSelector(state => state.chatsReducer.chats)
  const currentUser = useSelector(state => state.userReducer.currentUser)
  const myUid = currentUser.uid
  
  useEffect(() => {
    if(chats.length) {
      if(contacts && contacts[chat.with]) {
        setContact({...contacts[chat.with], isContact: true})
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
        <View style={contact.blocked[myUid] || currentUser.blocked[contact.uid] || contact.online === undefined ? {}: contact.online ? styles.online : styles.offline}></View>
        <Image source={{uri:contact.photoURL}} style={styles.photoURL} />
        <View style={styles.info}>
          {contact.isContact ? 
          <Text style={contact.blocked[myUid] || currentUser.blocked[contact.uid] ? styles.nameBlocked : styles.name}>
            {contact.nickname && contact.nickname[myUid] ? 
            `${contact.nickname[myUid].slice(0, 25)}${contact.nickname[myUid].length > 25 ? '...': ''}` 
            : 
            `${contact.displayName.slice(0, 25)}${contact.displayName.length > 25 ? '...' : ''}`
            }
          </Text>
          :
          <Text style={contact.blocked[myUid] || currentUser.blocked[contact.uid] ? styles.nameBlocked : styles.name}>
            {`${contact.email.slice(0, 25)}${contact.email.length > 25 ? '...': ''}`}
          </Text>
          }
          <Text style={contact.blocked[myUid] || currentUser.blocked[contact.uid] ? styles.messageBlocked : styles.message}>
            {`${chat.message.slice(0, 20)}${chat.message.length > 20 ? '...': ''}`}
          </Text>
        </View>
      </View>
      {contact.blocked[myUid] || currentUser.blocked[contact.uid] ? null :
      <View style={styles.right}>
        <ReactTimeAgo {...props} date={chat.createdAt} component={Time} />
      </View>
      }
    </TouchableOpacity>}
    </>
  )
}

export default memo(ChatItem)