import { View, Text, TouchableOpacity, BackHandler, Vibration, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import Loader from '../../components/Loader/Loader'
import ContactItem from '../../components/ContactItem/ContactItem'
import ModalAddContact from '../../components/ModalAddContact/ModalAddContact'
import ModalMenuActions from '../../components/ModalMenuActions/ModalMenuActions'
import { useFocusEffect } from '@react-navigation/native'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './Contacts.styles'

const Contacts = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showActionsModal, setShowActionsModal] = useState(false)
  const [uidSelected, setUidSelected] = useState('')

  const styles = useStyles(getStyles)
  const currentUser = useSelector(state => state.userReducer.currentUser)
  const contacts = useSelector(state => state.contactsReducer.contacts)

  useEffect(() => {
    setIsLoading(true)
    if(currentUser !== null) {
      setIsLoading(false)
    }
  }, [currentUser])

  useEffect(() => {
    if(!showActionsModal) {setUidSelected('')}
  }, [contacts, showActionsModal])

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => setUidSelected(''))
    return unsubscribe
  }, [navigation])

  useFocusEffect(
    useCallback(() => {
      const onBack = () => {
        if(uidSelected.length) {
          setUidSelected('')
          return true
        } return false
      }
      BackHandler.addEventListener('hardwareBackPress', onBack)
      return BackHandler.removeEventListener('hardwareBackPress', onBack)
    }, [setUidSelected, uidSelected])
  )

  const handleSelected = (contactUid) => {
    Vibration.vibrate(100, false)
    if(uidSelected.length) {setUidSelected('')} 
    else {setUidSelected(contactUid)}
    setShowActionsModal(true)
  }

  const handleGoToContactChat = (contact) => {
    navigation.navigate('Chat', {contact})
  }

  const renderItem = useCallback(({item}) => (
    <ContactItem contact={item} uidSelected={uidSelected} handleSelected={handleSelected} handleGoToContactChat={handleGoToContactChat} />
  ), [uidSelected])

  return (
    <View>
      {isLoading ? <Loader color={styles.loading.color} size={60} /> :
      <View>
        {contacts ? 
        <FlatList
          data={Object.values(contacts)}
          keyExtractor={item => item.uid}
          renderItem={renderItem} /> :
        <Text style={styles.notFound}>La lista de contactos esta vacía</Text>
        }
      </View>      
      }
      {/* BUTTON ADD  */}
      <View style={styles.buttonAddcontainer}>
        <TouchableOpacity onPress={() => setShowAddModal(!showAddModal)} style={styles.iconContainer}>
          <Icon name='person-add' size={25} color={styles.iconAdd.color} />
        </TouchableOpacity>
      </View>
      {/* MODAL ADD */}
      <ModalAddContact
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal} />
      {/* MODAL MENU ACTIONS */}
      <ModalMenuActions
        showActionsModal={showActionsModal}
        setShowActionsModal={setShowActionsModal}
        uidSelected={uidSelected}
        setIsLoading={setIsLoading}
        isLoading={isLoading} />
    </View>
  )
}

export default Contacts