import { View, Text,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import Loader from '../../components/Loader/Loader'
import useStyles from './Rooms.styles'
import ChatItem from '../../components/ChatItem/ChatItem'

const Rooms = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [showActionsModal, setShowActionsModal] = useState(false)
  const [uidSelected, setUidSelected] = useState('')

  const styles = useStyles()
  const {currentUser, chats} = useSelector(state => state)

  useEffect(() => {
    setIsLoading(true)
    if(currentUser !== null) {
      setIsLoading(false)
    }
  }, [currentUser])  

  const handleSelected = (uid) => {

  }

  const handleGoToContactChat = (uid, email) => {
    navigation.navigate('Chat', {contactUid: uid, email})
  }

  return (
    <View style={styles.container}>
      {isLoading ? <Loader color={styles.loading.color} size={60} /> :
      <View>
        <Header />
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
        <Text style={styles.notFound}>La lista de contactos esta vacía</Text>
        }
      </View>
      }
    </View>
  )
}

export default Rooms