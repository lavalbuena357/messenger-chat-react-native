import { View, Text, ScrollView, TouchableOpacity, BackHandler, Vibration } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import Loader from '../../components/Loader/Loader'
import Header from '../../components/Header/Header'
import ContactItem from '../../components/ContactItem/ContactItem'
import ModalAddContact from '../../components/ModalAddContact/ModalAddContact'
import useStyles from './Contacts.styles'
import ModalMenuActions from '../../components/ModalMenuActions/ModalMenuActions'
import { useFocusEffect } from '@react-navigation/native'

const Contacts = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showActionsModal, setShowActionsModal] = useState(false)
  const [uidSelected, setUidSelected] = useState('')

  const styles = useStyles()
  const {currentUser, contacts} = useSelector(state => state)

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

  return (
    <View>
      {isLoading ? <Loader color={styles.loading.color} size={60} /> :
      <View>
        <Header />
        {contacts ? 
        <ScrollView>
          {Object.values(contacts).map(el => (
            <ContactItem
              key={el.uid}
              contact={el}
              myUid={currentUser.uid}
              uidSelected={uidSelected}
              handleSelected={handleSelected} />
          ))}
        </ScrollView>
        :
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
        uidSelected={uidSelected} />
    </View>
  )
}

export default Contacts