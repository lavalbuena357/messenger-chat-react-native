import { View, Text, KeyboardAvoidingView, ScrollView, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './ChatScreen.styles'
import HeaderChat from '../../components/HeaderChat/HeaderChat'
import ChatInputMessage from '../../components/ChatInputMessage/ChatInputMessage'
import MessageItem from '../../components/MessageItem/MessageItem'
import Loader from '../../components/Loader/Loader'

import { getChatContact } from '../../redux/actions'
import { useFocusEffect } from '@react-navigation/native'

const ChatScreen = ({route}) => {
  const [isLoading, setIsLoading] = useState(true)

  const styles = useStyles()
  const scrollViewRef = useRef()
  const {contactChat, contacts, currentUser} = useSelector(state => state)
  const dispatch = useDispatch()
  const contact = contacts[route.params.contactUid]

  useEffect(() => {
    dispatch(getChatContact(currentUser.uid, contact.uid))
  }, [])

  useEffect(() => {
    if(contactChat !== null) {
      setIsLoading(false)
    }
  }, [contactChat])

  useFocusEffect(
    useCallback(() => {
      const onBack = () => {
        if(contactChat) {
          dispatch(getChatContact(null, null))
          return false
        } return false
      }
      BackHandler.addEventListener('hardwareBackPress', onBack)
      return () => BackHandler.removeEventListener('hardwareBackPress', onBack)
    }, [contactChat])
  )

  return (
    <View style={styles.container}>
      {isLoading ? <Loader color={styles.loading.color} size={60} /> :
      <View style={styles.container}>
        <HeaderChat contact={contact} uid={currentUser.uid} />
        <View style={styles.statusContainer}>
          <Text style={styles.status}>{contact.status.slice(0, 50)}{contact.status.length > 50 ? '...': ''}</Text>
        </View>
        <KeyboardAvoidingView
          behavior={null}
          keyboardVerticalOffset={70}
          style={styles.content} >
          <View>
            <ScrollView
              ref={scrollViewRef}
              onLayout={() => scrollViewRef.current.scrollToEnd({animated: true})}
              onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})} >
              {Object.keys(contactChat).length === 0 ? 
              <View style={styles.emptyChatContainer}>
                <Text style={styles.emptyChat}>Inicie una conversación...</Text>
              </View>
              :
              Object.values(contactChat).map(el => (
                <MessageItem key={el.chatId} />
              ))}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <ChatInputMessage uid={currentUser.uid} contactUid={contact.uid} />
      </View>
      }
    </View>
  )
}

export default ChatScreen