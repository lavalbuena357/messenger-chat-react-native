import { Text, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import useStyles from '../../screens/ChatScreen/ChatScreen.styles'
import MessageItem from '../MessageItem/MessageItem'

const ChatScroll = ({
  chats, 
  setChats, 
  contactChat, 
  currentUser, 
  contact, 
  offset, 
  setPage, 
  page, 
  isLoadMore, 
  setIsLoadMore}) => {

  const styles = useStyles()
  const scrollViewRef = useRef()

  const loadMore = () => {
    setPage(page+1)
    const last = contactChat.length-(page*offset) >= 0 ? contactChat.length-(page*offset) : 0
    const prev = contactChat.length-((page+1)*offset) >= 0 ? contactChat.length-((page+1)*offset) : 0
    setChats(prevData => [...contactChat.slice(prev, last), ...prevData])
    setIsLoadMore(true)
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true})
}

  return (
    // <KeyboardAvoidingView
    //   behavior={undefined}
    //   keyboardVerticalOffset={0}
    //   style={styles.content} >
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps='always'
          onLayout={() => scrollViewRef.current.scrollToEnd({animated: false})}
          onContentSizeChange={() => !isLoadMore && scrollViewRef.current.scrollToEnd({animated: false})} >
          {chats && chats.length > 0 ? 
          <>{chats.length >= offset &&  chats.length === contactChat.length ? null
            :
            chats.length >= offset && chats.length >= page * offset &&
            <TouchableOpacity style={styles.loadMore} onPress={loadMore}>
              <Text style={{color: styles.loadMore.color}}>Cargar más...</Text>
            </TouchableOpacity>}
            {chats.map((el, i) => (
            <MessageItem 
              key={el.chatId} 
              message={el} 
              currentUser={currentUser} 
              contact={contact}
              isPrev={i > 0 && contactChat[i-1].from !== contactChat[i].from ? true : false} />
            ))}
            </>
            :
            <Text style={styles.notFound}>Inicie una conversación</Text>
          }
      </ScrollView>
    // </KeyboardAvoidingView>
  )
}

export default ChatScroll