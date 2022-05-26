import { View, Text, FlatList, Pressable , useWindowDimensions, VirtualizedList} from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import useStyles from './ChatCustomEmojiPicker.styles'

const EmojisCategory = ({
  categorySelected, 
  emojiSize, 
  messageText, 
  setMessageText, 
  renderList,
  setIsOnlyEmoji,
  setEmojisRecently,
  emojisRecently,
  ListHeaderComponent
}) => {

  const styles = useStyles()
  const { width } = useWindowDimensions()

  const numColumns = useRef(
    Math.ceil((width+10) / (emojiSize * 2))
  )

  const handleEmoji = (_emoji) => {
    console.log(_emoji)
    if(messageText.length === 0) {
      setIsOnlyEmoji(true)
      setMessageText(_emoji.emoji)
    } else {
      setIsOnlyEmoji(false)
      setMessageText(messageText + _emoji.emoji)
    }
    if(emojisRecently.includes(_emoji, 0) === false) {
      if(emojisRecently.length >= 24) {
        emojisRecently.pop()
      }
      setEmojisRecently([_emoji, ...emojisRecently])
    }
  }
  
  const getItemLayout = useCallback((data, index) => ({
    length: numColumns.current,
    offset: numColumns.current * data.length,
    index
  }), [categorySelected])
  
  const renderItem = useCallback(({item}) => (
    <Pressable 
      style={styles.emojiButton} 
      onPress={() => handleEmoji(item)}>
      <Text style={{fontSize: emojiSize}}>{item.emoji}</Text>
    </Pressable>  
  ), [messageText])

  return (
    <View style={{flex: 21}}>
      <FlatList
        data={renderList[categorySelected]}
        contentContainerStyle={{padding: 10}}
        initialNumToRender={6}
        // ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => [item.name, index.name]}
        removeClippedSubviews={true}
        // getItemLayout={getItemLayout}
        numColumns={numColumns.current}
        renderItem={renderItem}/>
    </View>
  )
}

export default EmojisCategory