import { View, BackHandler} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './ChatScreen.styles'
import HeaderChat from '../../components/HeaderChat/HeaderChat'
import ChatInputMessage from '../../components/ChatInputMessage/ChatInputMessage'
import Loader from '../../components/Loader/Loader'
import { getChatContact, getUserById, unsubscribeChatContact } from '../../redux/actions'
import { useFocusEffect } from '@react-navigation/native'
import ChatStatusBar from '../../components/ChatStatusBar/ChatStatusBar'
import ChatScroll from '../../components/ChatScroll/ChatScroll'
import ChatCustomEmojiPicker from '../../components/ChatCustomEmojiPicker/ChatCustomEmojiPicker'
import UseKeyboard from '../../components/ChatCustomEmojiPicker/UseKeyboard'

const ChatScreen = ({route}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [contact, setContact] = useState(null)
  const [page, setPage] = useState(1)
  const [chats, setChats] = useState(null)
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)
  const [isStyileHidden, setStyleHidden] = useState(true)

  const offset = 20
  const styles = useStyles()
  const {contactChat, currentUser, contacts} = useSelector(state => state)
  const dispatch = useDispatch()
  const heightKeyboard = UseKeyboard()

  useEffect(() => {
    dispatch(getChatContact(currentUser.uid, route.params.contact.uid))
  }, [])

  useEffect(() => {
    if(contactChat.length >= offset) {
      const last = contactChat.length >= 0 ? contactChat.length : 0
      const prev = contactChat.length-(page*offset) >= 0 ? contactChat.length-(page*offset) : 0
      setChats(contactChat.slice(prev, last))
    } else {
      setChats(contactChat.slice(0, page*offset))
    }
  }, [contactChat])

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
    if(chats && contact) {
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
          return true
        }
        setChats(null)
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
          <ChatScroll
            chats={chats}
            setChats={setChats}
            contactChat={contactChat} 
            setPage={setPage}
            page={page}
            currentUser={currentUser}
            contact={contact}
            offset={offset}
            isLoadMore={isLoadMore}
            setIsLoadMore={setIsLoadMore} />
          
          <ChatInputMessage 
            uid={currentUser.uid} 
            contact={contact} 
            chats={contactChat}
            isLoadMore={isLoadMore}
            setIsLoadMore={setIsLoadMore}
            setIsEmojiOpen={setIsEmojiOpen}
            isEmojiOpen={isEmojiOpen}
            setStyleHidden={setStyleHidden} />
        </View>
        <ChatCustomEmojiPicker isEmojiOpen={isEmojiOpen}  />
      </View>
      }
    </View>
  )
}

export default ChatScreen