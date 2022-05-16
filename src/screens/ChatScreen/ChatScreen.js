import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import Loader from '../../components/Loader/Loader'
import useStyles from './ChatScreen.styles'
import HeaderChat from '../../components/HeaderChat/HeaderChat'
import ChatInputMessage from '../../components/ChatInputMessage/ChatInputMessage'

const ChatScreen = () => {
  const [isLoading, setIsLoading] = useState(false)

  const styles = useStyles()
  const scrollViewRef = useRef()

  return (
    <View style={styles.container}>
      {isLoading ? <Loader color={styles.loading.color} size={60} /> :
      <View style={styles.container}>
        <HeaderChat />
        <KeyboardAvoidingView
          behavior={null}
          keyboardVerticalOffset={70}
          style={styles.content} >
          <View>
            <ScrollView
              ref={scrollViewRef}
              onLayout={() => scrollViewRef.current.scrollToEnd({animated: true})}
              onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})} >
              <Text>text</Text>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <ChatInputMessage />
      </View>
      }
    </View>
  )
}

export default ChatScreen