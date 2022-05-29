import { View, BackHandler} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './ChatScreen.styles'
import HeaderChat from '../../components/ChatScreen/HeaderChat/HeaderChat'
import Loader from '../../components/Loader/Loader'
import { useFocusEffect } from '@react-navigation/native'
import ChatStatusBar from '../../components/ChatScreen/ChatStatusBar/ChatStatusBar'
import ChatScroll from '../../components/ChatScreen/ChatScroll/ChatScroll'
import ChatInputMessage from '../../components/ChatScreen/ChatInputMessage/ChatInputMessage'
import ChatCustomEmojiPicker from '../../components/ChatScreen/ChatCustomEmojiPicker/ChatCustomEmojiPicker'
import UseKeyboard from '../../components/ChatScreen/ChatCustomEmojiPicker/UseKeyboard'
import { getChatContact, unsubscribeChatContact } from '../../redux/actions/chats'
import { getUserById } from '../../redux/actions/users'

const ChatScreen = ({route}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [contact, setContact] = useState(null)
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)
  const [isStyileHidden, setStyleHidden] = useState(false)
  const [messageText, setMessageText] = useState('')

  const styles = useStyles()
  const currentUser = useSelector(state => state.userReducer.currentUser)
  const contacts = useSelector(state => state.contactsReducer.contacts)
  const dispatch = useDispatch()
  const heightKeyboard = UseKeyboard()

  useEffect(() => {
    dispatch(getChatContact(currentUser.uid, route.params.contact.uid))
  }, [])

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

  useEffect(() => {
    if(!isEmojiOpen && heightKeyboard === 0) {
      setStyleHidden(false)
    } else if(!isEmojiOpen && heightKeyboard > 0) {
      setStyleHidden(true)
    }
  }, [heightKeyboard])

  useFocusEffect(
    useCallback(() => {
      const onBack = () => {
        if(isEmojiOpen) {
          setIsEmojiOpen(false)
          setStyleHidden(false)
          return false
        }
        dispatch(unsubscribeChatContact(currentUser.uid, route.params.contact.uid))
        return false
      }
      BackHandler.addEventListener('hardwareBackPress', onBack)
      return () => BackHandler.removeEventListener('hardwareBackPress', onBack)
    }, [isEmojiOpen, setIsEmojiOpen])
  )

  return (
    <View style={styles.container}>
      {isLoading ? <Loader color={styles.loading.color} size={60} /> :
      <View>
        <HeaderChat contact={contact} uid={currentUser.uid} />
        <View style={styles.statusContainer}>
          <ChatStatusBar 
            contact={contact} 
            uid={currentUser.uid}
            setIsLoading={setIsLoading} 
            isLoading={isLoading} />
        </View>
        <View style={!isStyileHidden ? styles.aboveKeyboardHidden : styles.aboveKeyboard}>
          <ChatScroll />
          <ChatInputMessage 
            contact={contact} 
            setIsEmojiOpen={setIsEmojiOpen}
            isEmojiOpen={isEmojiOpen}
            setStyleHidden={setStyleHidden}
            messageText={messageText} 
            setMessageText={setMessageText} />
        </View>
        
        <ChatCustomEmojiPicker 
          isEmojiOpen={isEmojiOpen}
          setMessageText={setMessageText} />
      </View>
      }
    </View>
  )
}

export default ChatScreen