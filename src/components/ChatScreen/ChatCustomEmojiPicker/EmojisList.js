import { View, FlatList, useWindowDimensions } from 'react-native'
import React, { memo, useCallback, useRef } from 'react'
import emoji from '../../../assets/emojis.json'
import SingleEmoji from './SingleEmoji'

const EmojisList = ({category, setMessageText}) => {

  const renderEmojis = useCallback(() => {
    const filter = emoji.filter(e => e.category === category).sort((a, b) => a.sort_order - b.sort_order)
    return filter
  }, [])

  const { width } = useWindowDimensions()
  const emojiSize = 30
  const numColumns = useRef(
    Math.ceil((width+10) / (emojiSize * 2))
  )
  // const getItemLayout = useCallback((_, index) => ({
  //   length: 1,
  //   offset: 1 * index,
  //   index,
  // }), [emojiSize])

  const renderItem = useCallback(({item, index}) => {
    return (
    <SingleEmoji setMessageText={setMessageText} item={item} emojiSize={emojiSize} />
  )},[])

  return (
    <View style={{marginHorizontal: 10, alignItems: 'center'}}>
      <FlatList
        data={renderEmojis()}
        keyExtractor={item => item.name}
        // initialNumToRender={5}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        // windowSize={2}
        // getItemLayout={getItemLayout}
        numColumns={numColumns.current}
        renderItem={renderItem}/>
    </View>
  )
}

export default memo(EmojisList)