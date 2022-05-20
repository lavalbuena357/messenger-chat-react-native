import { View, Text, KeyboardAvoidingView, ScrollView, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './ChatScreen.styles'
import HeaderChat from '../../components/HeaderChat/HeaderChat'
import ChatInputMessage from '../../components/ChatInputMessage/ChatInputMessage'
import MessageItem from '../../components/MessageItem/MessageItem'
import Loader from '../../components/Loader/Loader'
import avatar from '../../assets/avatar.png'
import { getChatContact } from '../../redux/actions'
import { useFocusEffect } from '@react-navigation/native'
import ChatStatusBar from '../../components/ChatStatusBar/ChatStatusBar'

const ChatScreen = ({route}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [contact, setContact] = useState(null)

  const styles = useStyles()
  const scrollViewRef = useRef()
  const {contactChat, contacts, currentUser} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if(contacts[route.params.contactUid] === undefined) {
      setContact({
        uid: route.params.contactUid, 
        displayName: route.params.email, 
        photoURL: avatar, 
        isContact: false, 
        online: undefined,
        status: 'N/A'})
    } else {
      setContact({...contacts[route.params.contactUid], isContact: true})
    }
  }, [contacts])

  useEffect(() => {
    if(contact !== null) {
      dispatch(getChatContact(currentUser.uid, contact.uid))
    }
  }, [contact])

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
          <ChatStatusBar contact={contact} uid={currentUser.uid} />
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
              {Object.keys(contactChat).length > 0 && 
              Object.values(contactChat).map(el => (
                <MessageItem key={el.chatId} />
              ))}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <ChatInputMessage uid={currentUser.uid} contactUid={contact.uid} email={currentUser.email} />
      </View>
      }
    </View>
  )
}

export default ChatScreen