import { Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import useStyles from '../../../screens/ChatScreen/ChatScreen.styles'
import MessageItem from '../MessageItem/MessageItem'
import { useSelector } from 'react-redux'

const ChatScroll = () => {
  const [page, setPage] = useState(1)
  const [chats, setChats] = useState(null)
  const [isLoadMore, setIsLoadMore] = useState(false)

  const styles = useStyles()
  const scrollViewRef = useRef()
  const contactChat = useSelector(state => state.chatsReducer.contactChat)
  const offset = 20

  useEffect(() => {
    if(contactChat.length >= offset) {
      const last = contactChat.length >= 0 ? contactChat.length : 0
      const prev = contactChat.length-(page*offset) >= 0 ? contactChat.length-(page*offset) : 0
      setChats(contactChat.slice(prev, last))
    } else {
      setChats(contactChat.slice(0, page*offset))
    }
  }, [contactChat])

  const loadMore = () => {
    setPage(page+1)
    const last = contactChat.length-(page*offset) >= 0 ? contactChat.length-(page*offset) : 0
    const prev = contactChat.length-((page+1)*offset) >= 0 ? contactChat.length-((page+1)*offset) : 0
    setChats(prevData => [...contactChat.slice(prev, last), ...prevData])
    setIsLoadMore(true)
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true})
  }

  const RenderItems = useCallback(() => {
    const items = chats.map((el, i) => {
      return (
        <MessageItem key={i} message={el} />
      )
    })
    return items
  }, [chats])

  return (
    <ScrollView
      ref={scrollViewRef}
      style={{flex:1}}
      keyboardShouldPersistTaps='always'
      onLayout={() => scrollViewRef.current.scrollToEnd({animated: false})}
      onContentSizeChange={() => !isLoadMore || chats.length === contactChat.length  && scrollViewRef.current.scrollToEnd({animated: false})} >
      {chats && chats.length > 0 ? 
      <>{chats.length >= offset &&  chats.length === contactChat.length ? null
        :
        chats.length >= offset && chats.length >= page * offset &&
        <TouchableOpacity style={styles.loadMore} onPress={loadMore}>
          <Text style={{color: styles.loadMore.color}}>Cargar más...</Text>
        </TouchableOpacity>}
        {<RenderItems />}
        </>
        :
        <Text style={styles.notFound}>Inicie una conversación</Text>
      }
    </ScrollView>
  )
}

export default memo(ChatScroll)