import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './ContactItem.styles'

const ContactItem = ({contact, myUid, handleSelected, uidSelected, handleGoToContactChat}) => {

  const { email, photoURL, displayName, uid, online, status } = contact
  const styles = useStyles(getStyles)

  return (
    <TouchableOpacity
      delayLongPress={400}
      onLongPress={() => handleSelected(uid)}
      onPress={() => handleGoToContactChat({...contact, isContact: true})}
      style={uidSelected === uid ? styles.containerSelected : styles.container} >
      <View style={styles.left}>
        <View style={online ? styles.online : styles.offline}></View>
        <Image source={{uri:photoURL}} style={styles.photoURL} />
        <View style={styles.info}>
          <Text style={styles.name}>
            {contact.nickname && contact.nickname[myUid] ? 
            `${contact.nickname[myUid].slice(0, 35)}${contact.nickname[myUid].length > 35 ? '...': ''}` 
            : 
            `${displayName.slice(0, 30)}${displayName.length > 30 ? '...' : ''}`
            }
            </Text>
          <Text style={styles.mail}>{status.slice(0, 50)}{status.length > 50 ? '...': ''}</Text>
          <Text style={styles.mail}>{email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ContactItem