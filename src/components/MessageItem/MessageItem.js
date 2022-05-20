import { View, Text } from 'react-native'
import React from 'react'

const MessageItem = ({item}) => {

  // console.log(item.createdAt)
  // console.log('---------')
  const date = new Date(item.createdAt).toLocaleString()

  return (
    <View>
      <Text>{date}</Text>
    </View>
  )
}

export default MessageItem