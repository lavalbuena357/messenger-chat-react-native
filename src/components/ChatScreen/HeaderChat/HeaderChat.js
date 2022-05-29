import { View, Image, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import useStyles from '../../../Hooks/UseStyles'
import { getStyles } from './HeaderChat.styles'
import { unsubscribeChatContact } from '../../../redux/actions/chats'

const HeaderChat = ({contact, uid}) => {

  const styles = useStyles(getStyles)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleBack = () => {
    dispatch(unsubscribeChatContact(uid, contact.uid))
    navigation.goBack()
  }

  const handleSettings = () => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name='arrow-back' size={30} color={styles.icons.color} />
        </TouchableOpacity>
        <Image source={{uri:contact.photoURL}} style={styles.photoURL} />
        <View>
        {contact.isContact ? 
          <Text style={styles.name}>
            {contact.nickname && contact.nickname[uid] ? 
            `${contact.nickname[uid].slice(0, 25)}${contact.nickname[uid].length > 25 ? '...': ''}` 
            : 
            `${contact.displayName.slice(0, 25)}${contact.displayName.length > 25 ? '...' : ''}`
            }
          </Text>
          :
          <Text style={styles.name}>
            {`${contact.email.slice(0, 25)}${contact.email.length > 25 ? '...': ''}`}
          </Text>
          }
          <Text style={contact.online ? styles.online: styles.offline}>
            {contact.blocked[uid] ? 'Contacto bloqueado' : !contact.isContact ? 'No esta en tu lista de contactos' : contact.online ? 'En línea' : contact.online === undefined ? 'No está en tu lista de contactos' : 'Desconectado'}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleSettings}>
        <MatIcon name='dots-vertical' size={24} color={styles.icons.color} style={{padding:5}}/>
      </TouchableOpacity>
    </View>
  )
}

export default HeaderChat