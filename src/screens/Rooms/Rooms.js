import { View, Text,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import ChatItem from '../../components/ChatItem/ChatItem'
import useStyles from '../../Hooks/UseStyles'
import { getStyles } from './Rooms.styles'

const Rooms = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [showActionsModal, setShowActionsModal] = useState(false)
  const [uidSelected, setUidSelected] = useState('')

  const styles = useStyles(getStyles)
  const {currentUser, chats} = useSelector(state => state)

  useEffect(() => {
    setIsLoading(true)
    if(currentUser !== null) {
      setIsLoading(false)
    }
  }, [currentUser])  

  const handleSelected = (uid) => {

  }

  const handleGoToContactChat = (contact) => {
    navigation.navigate('Chat', {contact})
  }

  return (
    <View style={styles.container}>
      {isLoading ? <Loader color={styles.loading.color} size={60} /> :
      <View>
        {chats.length ?
        <ScrollView>
          {chats.map(el => (
            <ChatItem 
              key={el.chatId} 
              chat={el}
              myUid={currentUser.uid}
              uidSelected={uidSelected}
              handleSelected={handleSelected}
              handleGoToContactChat={handleGoToContactChat} />
          ))}
        </ScrollView>
        :
        <Text style={styles.notFound}>No hay conversaciones activas</Text>
        }
      </View>
      }
    </View>
  )
}

export default Rooms