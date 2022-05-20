import { View, Image, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import useStyles from './HeaderChat.styles'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { getChatContact } from '../../redux/actions'

const HeaderChat = ({contact, uid}) => {

  const styles = useStyles()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleBack = () => {
    dispatch(getChatContact(null, null))
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
        <Image source={contact.isContact ? {uri:contact.photoURL} : contact.photoURL} style={styles.photoURL} />
        <View>
          <Text style={styles.name}>
            {contact.nickname && contact.nickname[uid] ? 
            `${contact.nickname[uid].slice(0, 22)}${contact.nickname[uid].length > 22 ? '...': ''}` 
            : 
            `${contact.displayName.slice(0, 22)}${contact.displayName.length > 22 ? '...' : ''}`
            }
          </Text>
          <Text style={contact.online ? styles.online: styles.offline}>{contact.online ? 'En línea' : contact.online === undefined ? 'No está en tu lista de contactos' : 'Desconectado'}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleSettings}>
        <MatIcon name='dots-vertical' size={24} color={styles.icons.color} style={{padding:5}}/>
      </TouchableOpacity>
    </View>
  )
}

export default HeaderChat