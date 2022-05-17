import { View, Text, Image, TouchableOpacity,  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Header from '../../components/Header/Header'
import Loader from '../../components/Loader/Loader'
import useStyles from './ContactDetail.styles'

const ContactDetail = ({route}) => {
  const [showInput, setShowInput] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const styles = useStyles()

  const {currentUser, contacts} = useSelector(state => state)

  const contact = contacts[route.params.contactUid]

  useEffect(() => {
    setIsLoading(true)
    if(contact !== null) {
      setIsLoading(false)
    }
  }, [contact])

  const handleShowInputEdit = () => {

  }

  return (
    <View style={styles.container}>
      <Header />
      {isLoading ? 
      <Loader color={styles.loader.color} size={60} />
      :
      <View style={styles.infoCtn}>
        <Image source={{uri: contact.photoURL}} style={styles.photoURL} />
        <View style={styles.usernameBox}>
          <Text style={styles.name}>
            {contact.nickname && contact.nickname[currentUser.uid] ? contact.nickname[currentUser.uid] : contact.displayName}
          </Text>
          <TouchableOpacity onPress={handleShowInputEdit} style={styles.editBtn}>
            <Icon name='user-edit' size={16} color={styles.icon.color} />
          </TouchableOpacity>
        </View>
        <Text selectable style={styles.email}>{contact.email}</Text>
        <View style={contact.online ? styles.online : styles.offline}></View>
      </View>
      }
    </View>
  )
}

export default ContactDetail