import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Loader from '../../components/Loader/Loader'
import useStyles from './ChatScreen.styles'
import HeaderChat from '../../components/HeaderChat/HeaderChat'

const ChatScreen = () => {
  const [isLoading, setIsLoading] = useState(false)

  const styles = useStyles()

  return (
    <View style={styles.container}>
      {isLoading ? <Loader color={styles.loading.color} size={60} /> :
      <View>
        <HeaderChat />
      </View>
      }
    </View>
  )
}

export default ChatScreen