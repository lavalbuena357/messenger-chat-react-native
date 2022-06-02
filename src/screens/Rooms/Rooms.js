import { View, Text, FlatList, Vibration } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import ChatItem from '../../components/ChatItem/ChatItem'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './Rooms.styles'
import ModalMenuChats from '../../components/ModalMenuActions/ModalMenuChats'

const Rooms = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [showActionsModal, setShowActionsModal] = useState(false)
  const [uidSelected, setUidSelected] = useState('')

  const styles = useStyles(getStyles)
  const currentUser = useSelector(state => state.userReducer.currentUser)
  const chats = useSelector(state => state.chatsReducer.chats)

  useEffect(() => {
    setIsLoading(true)
    if(currentUser !== null) {
      setIsLoading(false)
    }
  }, [currentUser])

  useEffect(() => {
    if(!showActionsModal) {setUidSelected('')}
  }, [chats, showActionsModal])

  const handleSelected = (uid) => {
    Vibration.vibrate(100, false)
    if(uidSelected.length) {setUidSelected('')} 
    else {setUidSelected(uid)}
    setShowActionsModal(true)
  }

  const handleGoToContactChat = (contact) => {
    navigation.navigate('Chat', {contact})
  }

  const renderItem = useCallback(({item}) => (
    <ChatItem chat={item} uidSelected={uidSelected} handleSelected={handleSelected} handleGoToContactChat={handleGoToContactChat}  />
  ), [uidSelected])

  return (
    <View style={styles.container}>
      {isLoading ? <Loader color={styles.loading.color} size={60} /> :
      <View>
        {chats.length ?
          <FlatList
            data={chats}
            keyExtractor={item => item.chatId}
            renderItem={renderItem} /> : 
          <Text style={styles.notFound}>No hay conversaciones activas</Text>
        }
      </View>
      }
      <ModalMenuChats
        showActionsModal={showActionsModal}
        setShowActionsModal={setShowActionsModal}
        uidSelected={uidSelected}
        setIsLoading={setIsLoading}
        isLoading={isLoading} />
    </View>
  )
}

export default Rooms