import { View, Text, FlatList, Pressable , useWindowDimensions} from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import useStyles from './ChatCustomEmojiPicker.styles'

const EmojisCategory = ({categorySelected, emojiSize, messageText, setMessageText, renderList}) => {
  const [emojiSelected, setEmojiSelected] = useState(null)

  const styles = useStyles()
  const { width } = useWindowDimensions()

  const numColumns = useRef(
    Math.ceil((width+10) / (emojiSize * 2))
  )

  const handleEmoji = (_emoji) => {
    setEmojiSelected(_emoji)
    setMessageText(messageText + _emoji)
  }
  

  const getItemLayout = useCallback((data, index) => ({
    length: numColumns.current,
    offset: numColumns.current * data.length,
    index
  }), [categorySelected])
  
  const renderItem = useCallback(({item}) => (
    <Pressable 
      style={styles.emojiButton} 
      onPress={() => handleEmoji(item.emoji)}>
      <Text style={{fontSize: emojiSize}}>{item.emoji}</Text>
    </Pressable>  
  ), [messageText])

  return (
    <View style={{flex: 6}}>
      <FlatList
        data={renderList[categorySelected][0]}
        contentContainerStyle={{padding: 10}}
        keyExtractor={(item, index) => [item.name, index.name]}
        removeClippedSubviews={true}
        getItemLayout={getItemLayout}
        numColumns={numColumns.current}
        renderItem={renderItem}/>
    </View>
  )
}

export default EmojisCategory