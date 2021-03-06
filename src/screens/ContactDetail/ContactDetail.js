import { View, Text, Image, TouchableOpacity,  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Header from '../../components/Header/Header'
import Loader from '../../components/Loader/Loader'
import ModalEditContact from '../../components/ModalEditContact/ModalEditContact'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './ContactDetail.styles'

const ContactDetail = ({route}) => {
  const [showInput, setShowInput] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const styles = useStyles(getStyles)

  const currentUser = useSelector(state => state.userReducer.currentUser)
  const contacts = useSelector(state => state.contactsReducer.contacts)

  const contact = contacts[route.params.contactUid]

  useEffect(() => {
    setIsLoading(true)
    if(contact !== null) {
      setIsLoading(false)
    }
  }, [contact])

  const handleShowInputEdit = () => {
    setShowInput(true)
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
      {showInput &&
      <ModalEditContact contact={contact} setShowInput={setShowInput} showInput={showInput} />
      }
    </View>
  )
}

export default ContactDetail