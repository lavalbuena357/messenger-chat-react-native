import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import useStyles from './ContactItem.styles'

const ContactItem = ({contact, myUid}) => {

  const { email, photoURL, displayName, uid, online } = contact
  const styles = useStyles()

  return (
    <TouchableOpacity
      style={styles.container} >
      <View style={styles.left}>
        <View style={online ? styles.online : styles.offline}></View>
        <Image source={{uri:photoURL}} style={styles.photoURL} />
        <View style={styles.info}>
          <Text style={styles.name}>
            {contact.nickname && contact.nickname[myUid] ? 
            `${contact.nickname[myUid].slice(0, 35)} ${contact.nickname[myUid].length > 35 ? '...': ''}` 
            : 
            `${displayName.slice(0, 35)} ${displayName.length > 35 ? '...' : ''}`
            }
            </Text>
          <Text style={styles.mail}>{email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ContactItem