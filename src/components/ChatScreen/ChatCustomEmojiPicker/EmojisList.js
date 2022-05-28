import { View, FlatList, useWindowDimensions } from 'react-native'
import React, { memo, useCallback, useRef } from 'react'
import { UseDataEmojis } from './data'
import SingleEmoji from './SingleEmoji'

const EmojisList = ({index, setMessageText}) => {

  const renderEmojis = useCallback(UseDataEmojis(), [])

  const { width } = useWindowDimensions()
  const emojiSize = 30
  const numColumns = useRef(
    Math.ceil((width+10) / (emojiSize * 2))
  )
  const getItemLayout = useCallback((_, index) => ({
    length: 1,
    offset: 1 * index,
    index,
  }), [emojiSize])

  const renderItem = useCallback(({item, index}) => {
    return (
    <SingleEmoji setMessageText={setMessageText} item={item} emojiSize={emojiSize} />
  )},[])

  return (
    <View style={{marginHorizontal: 10, alignItems: 'center'}}>
      <FlatList
        data={renderEmojis[index].items}
        keyExtractor={item => item.name}
        initialNumToRender={5}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        // windowSize={2}
        getItemLayout={getItemLayout}
        numColumns={numColumns.current}
        renderItem={renderItem}/>
    </View>
  )
}

export default memo(EmojisList)