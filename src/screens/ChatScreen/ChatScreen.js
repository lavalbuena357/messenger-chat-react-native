import { View, Text, KeyboardAvoidingView, ScrollView, BackHandler, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './ChatScreen.styles'
import HeaderChat from '../../components/HeaderChat/HeaderChat'
import ChatInputMessage from '../../components/ChatInputMessage/ChatInputMessage'
import MessageItem from '../../components/MessageItem/MessageItem'
import Loader from '../../components/Loader/Loader'
import { getChatContact, getUserById, unsubscribeChatContact } from '../../redux/actions'
import { useFocusEffect } from '@react-navigation/native'
import ChatStatusBar from '../../components/ChatStatusBar/ChatStatusBar'

const ChatScreen = ({route}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [contact, setContact] = useState(null)
  const [page, setPage] = useState(1)

  const styles = useStyles()
  const scrollViewRef = useRef()
  const {contactChat, currentUser, contacts} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getChatContact(currentUser.uid, route.params.contact.uid, page))
  }, [page])

  useEffect(() => {
      if(contacts && contacts[route.params.contact.uid]) {
        setContact({...contacts[route.params.contact.uid], isContact: true})
      } else {
        (async() => {
          const getUser = await getUserById(route.params.contact.uid)
          setContact({...getUser, isContact: false})
        })()
      }
  }, [contacts])
  
  useEffect(() => {
    if(contact) {
      setIsLoading(false)
    }
  }, [contact])

  useFocusEffect(
    useCallback(() => {
      const onBack = () => {
          dispatch(unsubscribeChatContact(currentUser.uid, route.params.contact.uid, 1))
          return false
      }
      BackHandler.addEventListener('hardwareBackPress', onBack)
      return () => BackHandler.removeEventListener('hardwareBackPress', onBack)
    }, [])
  )

  return (
    <View style={styles.container}>
      {isLoading ? <Loader color={styles.loading.color} size={60} /> :
      <View style={styles.container}>
        <HeaderChat contact={contact} uid={currentUser.uid} />
        <View style={styles.statusContainer}>
          <ChatStatusBar 
            contact={contact} 
            uid={currentUser.uid}
            setIsLoading={setIsLoading} 
            isLoading={isLoading}
            unsubscribe={unsubscribeChatContact} />
        </View>
        <KeyboardAvoidingView
          behavior={null}
          keyboardVerticalOffset={70}
          style={styles.content} >
          <View>
            <ScrollView
              ref={scrollViewRef}
              onLayout={() => scrollViewRef.current.scrollToEnd({animated: true})}>
              {contactChat.length > 0 ?
              <>
              {contactChat.length >= 10 && 
              <TouchableOpacity style={styles.loadMore} onPress={() => setPage(page + 1)}>
                <Text style={{color: styles.loadMore.color}}>Cargar más...</Text>
              </TouchableOpacity>}
              {contactChat.map((el, i) => (
                <MessageItem 
                  key={el.chatId} 
                  message={el} 
                  currentUser={currentUser} 
                  contact={contact}
                  isPrev={i > 0 && contactChat[i-1].from !== contactChat[i].from ? true : false} />
              ))}</>
              :
              <>
              <Text style={styles.notFound}>Inicie una conversación</Text>
              </>
            }
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <ChatInputMessage uid={currentUser.uid} contact={contact} chats={contactChat} />
      </View>
      }
    </View>
  )
}

export default ChatScreen